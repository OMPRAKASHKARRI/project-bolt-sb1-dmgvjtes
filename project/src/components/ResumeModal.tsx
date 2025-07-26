import React from 'react';
import { X, FileText, Calendar } from 'lucide-react';
import ResumeResults from './ResumeResults';

interface ResumeModalProps {
  resume: {
    id: string;
    filename: string;
    file_size: number;
    analysis_result: any;
    created_at: string;
  };
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ resume, onClose }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl max-h-[90vh] w-full overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{resume.filename}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{(resume.file_size / 1024 / 1024).toFixed(2)} MB</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(resume.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <ResumeResults analysis={resume.analysis_result} />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;