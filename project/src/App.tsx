import React, { useState } from 'react';
import { FileText, History, Upload, Eye, Calendar, User, Mail, Phone, Star, TrendingUp } from 'lucide-react';
import LiveAnalysis from './components/LiveAnalysis';
import HistoricalViewer from './components/HistoricalViewer';

function App() {
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Resume Analyzer</h1>
                <p className="text-sm text-gray-500">AI-Powered Resume Analysis & Feedback</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Professional Grade Analysis</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1">
          <nav className="flex space-x-1">
            <button
              onClick={() => setActiveTab('live')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === 'live'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Upload className="h-4 w-4" />
              <span>Live Resume Analysis</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <History className="h-4 w-4" />
              <span>Historical Viewer</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'live' ? <LiveAnalysis /> : <HistoricalViewer />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              © 2025 Resume Analyzer. Built with React, Node.js, and AI.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>Powered by Google Gemini</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;