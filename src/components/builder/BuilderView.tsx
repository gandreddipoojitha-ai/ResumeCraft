import React, { useState, useEffect } from 'react';
import { ResumeData, ThemeConfig } from '../../types/resume';
import { storageService } from '../../services/storageService';
import { FormSections } from './FormSections';
import { CustomizationBar } from './CustomizationBar';
import { ResumePreview } from '../preview/ResumePreview';
import {
  Sparkles,
  ShieldCheck,
  Share2,
  Printer,
  Download,
  Save,
  Check,
  Eye,
  Edit2,
  ChevronLeft,
  Bot
} from 'lucide-react';

interface BuilderViewProps {
  resumeId?: string;
  onBackToDashboard: () => void;
  onOpenAtsModal: (resume: ResumeData) => void;
  onOpenAiHelper: (mode: 'summary' | 'project' | 'skills' | 'bullet' | 'grammar', context?: any) => void;
  onOpenShareModal: (resume: ResumeData) => void;
}

export const BuilderView: React.FC<BuilderViewProps> = ({
  resumeId,
  onBackToDashboard,
  onOpenAtsModal,
  onOpenAiHelper,
  onOpenShareModal,
}) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (resumeId) {
      const all = storageService.getSavedResumes();
      const match = all.find((r) => r.id === resumeId);
      if (match) return match;
    }
    return storageService.getActiveResume();
  });

  const [savedStatus, setSavedStatus] = useState<string>('Saved');
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [editingTitle, setEditingTitle] = useState(false);

  // Auto-save on data change with debounce
  useEffect(() => {
    setSavedStatus('Saving...');
    const timer = setTimeout(() => {
      storageService.saveResume(resumeData);
      setSavedStatus('Saved');
    }, 400);

    return () => clearTimeout(timer);
  }, [resumeData]);

  const handleDataChange = (updated: ResumeData) => {
    setResumeData(updated);
  };

  const handleThemeChange = (newTheme: ThemeConfig) => {
    setResumeData((prev) => ({
      ...prev,
      theme: newTheme,
    }));
  };

  const handleManualSave = () => {
    storageService.saveResume(resumeData);
    setSavedStatus('Saved just now');
    setTimeout(() => setSavedStatus('Saved'), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-100 overflow-hidden">
      {/* Top Workspace Header Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
            title="Back to Resumes Dashboard"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Editable Title */}
          <div className="flex items-center gap-1.5">
            {editingTitle ? (
              <input
                type="text"
                autoFocus
                value={resumeData.title}
                onBlur={() => setEditingTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setEditingTitle(false);
                }}
                onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                className="px-2 py-0.5 text-xs sm:text-sm font-bold border border-indigo-400 rounded focus:outline-none"
              />
            ) : (
              <button
                onClick={() => setEditingTitle(true)}
                className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors group"
              >
                <span>{resumeData.title || 'Untitled Resume'}</span>
                <Edit2 className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 opacity-60" />
              </button>
            )}

            <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
              · {savedStatus}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Edit / Preview Toggle */}
          <div className="lg:hidden flex items-center bg-slate-100 p-0.5 rounded-lg mr-1">
            <button
              onClick={() => setMobileTab('edit')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                mobileTab === 'edit' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Form
            </button>
            <button
              onClick={() => setMobileTab('preview')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                mobileTab === 'preview' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Preview
            </button>
          </div>

          <button
            onClick={() => onOpenAiHelper('summary', { currentSummary: resumeData.summary, field: resumeData.personal.jobTitle })}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Assistant</span>
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-n8n-chat'))}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors"
            title="Open n8n AI Chat Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-purple-600" />
            <span>n8n Chat</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </button>

          <button
            onClick={() => onOpenAtsModal(resumeData)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">ATS Check</span>
          </button>

          <button
            onClick={() => onOpenShareModal(resumeData)}
            className="p-1.5 sm:px-3 sm:py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center gap-1"
            title="Share & Export"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
            title="Download PDF or Print"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Customization Toolbar (Template, Font, Color, Size, Spacing) */}
      <CustomizationBar theme={resumeData.theme} onChange={handleThemeChange} />

      {/* Main Split Body */}
      <div className="flex-1 flex overflow-hidden p-3 sm:p-4 gap-4">
        {/* Left Side: Step-by-Step Form Inputs */}
        <div
          className={`w-full lg:w-1/2 h-full flex flex-col ${
            mobileTab === 'edit' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <FormSections
            data={resumeData}
            onChange={handleDataChange}
            onOpenAiHelper={onOpenAiHelper}
          />
        </div>

        {/* Right Side: Real-Time Live Preview */}
        <div
          className={`w-full lg:w-1/2 h-full bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden ${
            mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <ResumePreview
            data={resumeData}
            onOpenAtsModal={() => onOpenAtsModal(resumeData)}
          />
        </div>
      </div>
    </div>
  );
};
