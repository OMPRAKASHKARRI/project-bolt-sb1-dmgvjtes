import React from 'react';
import { 
  User, Mail, Phone, MapPin, Linkedin, Globe, 
  Briefcase, GraduationCap, Code, Users, 
  Award, Star, TrendingUp, CheckCircle 
} from 'lucide-react';

interface ResumeResultsProps {
  analysis: {
    personalDetails: {
      name: string;
      email: string;
      phone: string;
      linkedin: string;
      portfolio: string;
      location: string;
    };
    summary: string;
    workExperience: Array<{
      company: string;
      position: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      duration: string;
      gpa: string;
    }>;
    projects: Array<{
      title: string;
      description: string;
      technologies: string[];
    }>;
    certifications: Array<{
      title: string;
      issuer: string;
      date: string;
    }>;
    technicalSkills: string[];
    softSkills: string[];
    rating: number;
    feedback: {
      strengths: string[];
      improvements: string[];
      suggestedSkills: string[];
      overallSummary: string;
    };
  };
}

const ResumeResults: React.FC<ResumeResultsProps> = ({ analysis }) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600 bg-green-100 border-green-200';
    if (rating >= 6) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const renderSkillBadge = (skill: string, type: 'technical' | 'soft') => (
    <span
      key={skill}
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        type === 'technical' 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-purple-100 text-purple-800'
      }`}
    >
      {skill}
    </span>
  );

  return (
    <div className="space-y-8">
      {/* Rating and Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-xl border-2 ${getRatingColor(analysis.rating)}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Overall Rating</h3>
            <Star className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold mb-2">{analysis.rating}/10</div>
          <p className="text-sm opacity-90">Based on AI analysis</p>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            AI Assessment
          </h3>
          <p className="text-gray-700 leading-relaxed">{analysis.feedback.overallSummary}</p>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <User className="h-5 w-5 mr-2 text-blue-600" />
          Personal Information
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysis.personalDetails.name && (
            <div className="flex items-center space-x-3">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900">{analysis.personalDetails.name}</span>
            </div>
          )}
          {analysis.personalDetails.email && (
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <a href={`mailto:${analysis.personalDetails.email}`} className="text-blue-600 hover:underline">
                {analysis.personalDetails.email}
              </a>
            </div>
          )}
          {analysis.personalDetails.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900">{analysis.personalDetails.phone}</span>
            </div>
          )}
          {analysis.personalDetails.location && (
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900">{analysis.personalDetails.location}</span>
            </div>
          )}
          {analysis.personalDetails.linkedin && (
            <div className="flex items-center space-x-3">
              <Linkedin className="h-4 w-4 text-gray-400" />
              <a href={analysis.personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn Profile
              </a>
            </div>
          )}
          {analysis.personalDetails.portfolio && (
            <div className="flex items-center space-x-3">
              <Globe className="h-4 w-4 text-gray-400" />
              <a href={analysis.personalDetails.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {analysis.summary && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
        </div>
      )}

      {/* Skills */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Code className="h-5 w-5 mr-2 text-blue-600" />
            Technical Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.technicalSkills.map(skill => renderSkillBadge(skill, 'technical'))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-600" />
            Soft Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.softSkills.map(skill => renderSkillBadge(skill, 'soft'))}
          </div>
        </div>
      </div>

      {/* Work Experience */}
      {analysis.workExperience.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
            Work Experience
          </h3>
          <div className="space-y-6">
            {analysis.workExperience.map((job, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{job.position}</h4>
                  <span className="text-sm text-gray-500">{job.duration}</span>
                </div>
                <p className="text-blue-600 font-medium mb-3">{job.company}</p>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {analysis.education.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
            Education
          </h3>
          <div className="space-y-4">
            {analysis.education.map((edu, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                  <p className="text-blue-600">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm text-gray-500 mt-2 md:mt-0">{edu.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {analysis.projects.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Code className="h-5 w-5 mr-2 text-blue-600" />
            Projects
          </h3>
          <div className="space-y-6">
            {analysis.projects.map((project, index) => (
              <div key={index} className="border-l-4 border-green-200 pl-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h4>
                <p className="text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {analysis.certifications.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Award className="h-5 w-5 mr-2 text-blue-600" />
            Certifications
          </h3>
          <div className="space-y-4">
            {analysis.certifications.map((cert, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{cert.title}</h4>
                  <p className="text-blue-600">{cert.issuer}</p>
                </div>
                <span className="text-sm text-gray-500 mt-2 md:mt-0">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Feedback */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Strengths
          </h3>
          <ul className="space-y-2">
            {analysis.feedback.strengths.map((strength, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-green-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
          <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Areas for Improvement
          </h3>
          <ul className="space-y-2">
            {analysis.feedback.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-orange-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggested Skills */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Suggested Skills for Upskilling</h3>
        <div className="flex flex-wrap gap-2">
          {analysis.feedback.suggestedSkills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-blue-200 text-blue-800 text-sm font-medium rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeResults;