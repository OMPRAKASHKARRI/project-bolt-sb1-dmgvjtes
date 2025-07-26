# Sample Resume Data

This folder contains sample PDF resumes used for testing the Resume Analyzer application.

## Test Files Included

**Note**: Due to privacy concerns, actual resume PDFs are not included in this repository. 

To test the application, you can:

1. **Create test PDFs** with sample resume content
2. **Use publicly available resume templates** from sites like:
   - Canva
   - Resume.io
   - Microsoft Office templates
   - Google Docs templates

## Recommended Test Scenarios

### Test Case 1: Complete Resume
- Include all sections: personal details, summary, work experience, education, projects, certifications, skills
- Test with multiple work experiences and projects
- Include both technical and soft skills

### Test Case 2: Minimal Resume
- Basic personal details
- Limited work experience
- Minimal skills section
- Test how AI handles sparse information

### Test Case 3: Technical Resume
- Heavy focus on technical skills
- Multiple programming projects
- Technical certifications
- Software development experience

### Test Case 4: Creative/Marketing Resume
- Creative industry experience
- Portfolio links
- Design skills
- Marketing projects and campaigns

### Test Case 5: Recent Graduate Resume
- Limited work experience
- Focus on education and projects
- Internships and part-time work
- Academic achievements

## Testing Guidelines

1. **File Format**: Only PDF files are supported
2. **File Size**: Maximum 10MB per file
3. **Content Quality**: Ensure text is selectable (not just images)
4. **Language**: Currently optimized for English resumes

## Privacy Notice

- Never commit real personal resumes to version control
- Use anonymized or fictional data for testing
- Remove any sensitive information before testing
- Consider using resume builders to create test data

## Expected AI Analysis

The application should successfully extract:
- ✅ Personal contact information
- ✅ Professional summary/objective
- ✅ Work experience with job descriptions
- ✅ Educational background
- ✅ Technical and soft skills
- ✅ Projects and certifications
- ✅ AI-generated feedback and rating

If the AI fails to extract certain information, it may indicate:
- Poor PDF text quality
- Unusual resume formatting
- Missing sections in the resume
- Need for prompt engineering improvements