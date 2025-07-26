# Full-Stack Resume Analyzer

A comprehensive web application that uses AI to analyze resumes, extract structured information, and provide intelligent feedback for improvement.

## 🚀 Features

### Tab 1: Live Resume Analysis
- **PDF Upload**: Drag-and-drop or click to upload resume PDFs (up to 10MB)
- **AI-Powered Analysis**: Uses Google Gemini AI to extract structured information
- **Comprehensive Data Extraction**:
  - Personal details (name, email, phone, LinkedIn, portfolio, location)
  - Professional summary
  - Work experience with detailed descriptions
  - Education history
  - Projects with technologies used
  - Certifications
  - Technical and soft skills categorization
- **Intelligent Feedback**:
  - Resume rating (1-10 scale)
  - Identified strengths
  - Areas for improvement
  - Suggested skills for upskilling
  - Overall assessment summary
- **Database Storage**: All analyses are automatically saved for future reference

### Tab 2: Historical Viewer
- **Resume History**: View all previously analyzed resumes in a comprehensive table
- **Quick Overview**: See key information (name, email, rating, upload date) at a glance
- **Detailed Analysis**: Click "View Details" to open a modal with the complete analysis
- **Search & Filter**: Easy navigation through historical data

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building

### Backend
- **Node.js** with Express.js
- **Multer** for file upload handling
- **PDF-Parse** for PDF text extraction
- **Google Gemini AI** for intelligent analysis
- **CORS** for cross-origin requests

### Database
- **Supabase** (PostgreSQL)
- Real-time data synchronization
- Secure API endpoints

### AI Integration
- **Google Gemini 1.5 Flash** model
- Advanced prompt engineering for structured data extraction
- Intelligent feedback generation

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Gemini API Key**
- **Supabase Project** with database setup

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd resume-analyzer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
# Google Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Server Configuration
PORT=3001
```

### 4. Database Setup
Create the following table in your Supabase database:

```sql
CREATE TABLE resume_analyses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  filename text NOT NULL,
  file_size integer NOT NULL,
  extracted_text text NOT NULL,
  analysis_result jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE resume_analyses ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations" ON resume_analyses FOR ALL USING (true);
```

### 5. Get Your API Keys

#### Google Gemini API Key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

#### Supabase Configuration:
1. Create a new project at [Supabase](https://supabase.com)
2. Go to Settings > API
3. Copy the Project URL and anon/service_role keys to your `.env` file

## 🏃‍♂️ Running the Application

### Development Mode
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start them separately:
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

### Production Build
```bash
npm run build
npm run preview
```

## 📱 Usage Guide

### Uploading a Resume
1. Navigate to the "Live Resume Analysis" tab
2. Drag and drop a PDF file or click to browse
3. Click "Analyze Resume" to start the AI analysis
4. View the comprehensive results including rating and feedback

### Viewing Historical Data
1. Switch to the "Historical Viewer" tab
2. Browse through all previously analyzed resumes
3. Click "View Details" on any row to see the full analysis
4. Use the refresh button to reload the latest data

## 🔧 API Endpoints

### Upload & Analyze Resume
```
POST /api/upload
Content-Type: multipart/form-data
Body: resume (PDF file)

Response: {
  success: boolean,
  analysis: object,
  resumeId: string
}
```

### Get All Resumes
```
GET /api/resumes

Response: {
  resumes: array
}
```

### Get Specific Resume
```
GET /api/resumes/:id

Response: {
  resume: object
}
```

### Health Check
```
GET /api/health

Response: {
  status: "OK",
  timestamp: string
}
```

## 📊 Data Structure

The AI analysis returns a structured JSON object with the following format:

```json
{
  "personalDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-234-567-8900",
    "linkedin": "https://linkedin.com/in/johndoe",
    "portfolio": "https://johndoe.com",
    "location": "New York, NY"
  },
  "summary": "Professional summary...",
  "workExperience": [...],
  "education": [...],
  "projects": [...],
  "certifications": [...],
  "technicalSkills": [...],
  "softSkills": [...],
  "rating": 8.5,
  "feedback": {
    "strengths": [...],
    "improvements": [...],
    "suggestedSkills": [...],
    "overallSummary": "..."
  }
}
```

## 🎨 Design Features

- **Modern UI**: Clean, professional design with subtle animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Interactive Elements**: Hover states, transitions, and micro-interactions
- **Color-Coded Ratings**: Visual feedback with green/yellow/red rating system
- **Accessible Design**: High contrast ratios and keyboard navigation support

## 🔒 Security Features

- **File Type Validation**: Only PDF files are accepted
- **File Size Limits**: Maximum 10MB upload size
- **Error Handling**: Comprehensive error handling throughout the application
- **Input Sanitization**: All user inputs are properly sanitized

## 🚦 Testing

The application has been thoroughly tested with various resume formats and includes:
- PDF text extraction validation
- AI response parsing
- Database operation error handling
- Frontend form validation
- API endpoint testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful language model capabilities
- **Supabase** for database and backend services
- **React Community** for excellent development tools
- **Tailwind CSS** for utility-first styling approach

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs
4. Provide your environment details (OS, Node.js version, etc.)

---

Built with ❤️ using React, Node.js, and AI
