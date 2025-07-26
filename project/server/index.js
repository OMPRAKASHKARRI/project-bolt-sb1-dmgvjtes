import express from 'express';
import cors from 'cors';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Helper function to analyze resume with Gemini
async function analyzeResumeWithAI(resumeText) {
  const prompt = `
    Analyze the following resume text and extract structured information. Return a JSON object with the following structure:
    
    {
      "personalDetails": {
        "name": "Full Name",
        "email": "email@example.com",
        "phone": "phone number",
        "linkedin": "LinkedIn URL",
        "portfolio": "Portfolio URL",
        "location": "City, State"
      },
      "summary": "Professional summary or objective",
      "workExperience": [
        {
          "company": "Company Name",
          "position": "Job Title",
          "duration": "Start Date - End Date",
          "description": "Job description and achievements"
        }
      ],
      "education": [
        {
          "institution": "University/School Name",
          "degree": "Degree Type and Major",
          "duration": "Start Year - End Year",
          "gpa": "GPA if mentioned"
        }
      ],
      "projects": [
        {
          "title": "Project Name",
          "description": "Project description",
          "technologies": ["Tech1", "Tech2"]
        }
      ],
      "certifications": [
        {
          "title": "Certification Name",
          "issuer": "Issuing Organization",
          "date": "Issue Date"
        }
      ],
      "technicalSkills": ["Skill1", "Skill2", "Skill3"],
      "softSkills": ["Skill1", "Skill2", "Skill3"],
      "rating": 8.5,
      "feedback": {
        "strengths": ["Strength 1", "Strength 2"],
        "improvements": ["Improvement 1", "Improvement 2"],
        "suggestedSkills": ["Skill 1", "Skill 2"],
        "overallSummary": "Overall assessment of the resume"
      }
    }

    Resume Text:
    ${resumeText}
    
    Please ensure the JSON is valid and complete. If any information is not available, use null or empty arrays as appropriate.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No valid JSON found in AI response');
    }
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error('Failed to analyze resume with AI');
  }
}

// Routes
app.post('/api/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    if (!resumeText.trim()) {
      return res.status(400).json({ error: 'Could not extract text from PDF' });
    }

    // Analyze resume with AI
    const analysis = await analyzeResumeWithAI(resumeText);

    // Store in database
    const { data, error } = await supabase
      .from('resume_analyses')
      .insert({
        filename: req.file.originalname,
        file_size: req.file.size,
        extracted_text: resumeText,
        analysis_result: analysis,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ error: 'Failed to save analysis to database' });
    }

    res.json({
      success: true,
      analysis,
      resumeId: data.id
    });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to process resume' 
    });
  }
});

app.get('/api/resumes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('resume_analyses')
      .select('id, filename, file_size, analysis_result, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ error: 'Failed to fetch resumes' });
    }

    res.json({ resumes: data });
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

app.get('/api/resumes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('resume_analyses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Database Error:', error);
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({ resume: data });
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch resume details' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});