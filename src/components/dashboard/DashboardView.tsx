import React, { useState } from 'react';
import { ResumeData, UserAccount } from '../../types/resume';
import { storageService } from '../../services/storageService';
import {
  FileText,
  Plus,
  Copy,
  Trash2,
  Edit3,
  Download,
  Calendar,
  Sparkles,
  Upload,
  Search,
  CheckCircle,
  FileCheck
} from 'lucide-react';

interface DashboardViewProps {
  user: UserAccount | null;
  onOpenBuilder: (resumeId?: string) => void;
  onOpenAtsModal: (resume: ResumeData) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onOpenBuilder,
  onOpenAtsModal,
}) => {
  const [resumes, setResumes] = useState<ResumeData[]>(() => storageService.getSavedResumes());
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const reloadResumes = () => {
    setResumes(storageService.getSavedResumes());
  };

  const handleCreateNew = (preset: 'blank' | 'student' | 'developer') => {
    const created = storageService.createNewResume(preset);
    reloadResumes();
    setShowCreateModal(false);
    onOpenBuilder(created.id);
  };

  const handleDuplicate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    storageService.duplicateResume(id);
    reloadResumes();
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const remaining = storageService.deleteResume(id);
      setResumes(remaining);
    }
  };

  const filteredResumes = resumes.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.personal.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.personal.jobTitle || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {user ? `Welcome, ${user.name}` : 'My Resume Dashboard'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage, duplicate, edit, and export your resumes from one central workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Resume</span>
          </button>
        </div>
      </div>

      {/* Search and Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved resumes by title or role..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-semibold text-slate-800">{filteredResumes.length}</span> of{' '}
          <span className="font-semibold text-slate-800">{resumes.length}</span> resumes
        </div>
      </div>

      {/* Resume Cards Grid */}
      {filteredResumes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800">No resumes found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery ? 'Try clearing your search query to see all resumes.' : 'Get started by creating your first professional resume.'}
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 mt-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Resume</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResumes.map((resume) => (
            <div
              key={resume.id}
              onClick={() => onOpenBuilder(resume.id)}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all duration-150 p-5 flex flex-col justify-between cursor-pointer relative"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xs"
                      style={{ backgroundColor: resume.theme.accentColor || '#4F46E5' }}
                    >
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {resume.title || 'Untitled Resume'}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {resume.personal.fullName || 'No name specified'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {resume.theme.template}
                  </span>
                </div>

                <div className="space-y-1.5 py-2 text-xs text-slate-600 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Last edited {new Date(resume.lastModified || Date.now()).toLocaleDateString()}</span>
                  </div>
                  {resume.personal.jobTitle && (
                    <div className="text-slate-700 font-medium truncate">
                      {resume.personal.jobTitle}
                    </div>
                  )}
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                    <span>{resume.education?.length || 0} education</span>
                    <span>·</span>
                    <span>{resume.projects?.length || 0} projects</span>
                    <span>·</span>
                    <span>{(resume.skills?.technical?.length || 0) + (resume.skills?.soft?.length || 0)} skills</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBuilder(resume.id);
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Resume</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAtsModal(resume);
                    }}
                    title="Run ATS Check"
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      storageService.exportResumeAsJson(resume);
                    }}
                    title="Export JSON backup"
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDuplicate(resume.id, e)}
                    title="Duplicate resume"
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {resumes.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => handleDelete(resume.id, e)}
                      title="Delete resume"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preset Choice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Choose a Starting Preset</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => handleCreateNew('student')}
                className="w-full p-3.5 text-left rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-colors flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Student & Fresher Template</div>
                  <div className="text-[11px] text-slate-500">
                    Pre-populated with academic highlights, courses, projects, and CGPA format. Recommended for graduates.
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleCreateNew('developer')}
                className="w-full p-3.5 text-left rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition-colors flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Modern Software Engineer</div>
                  <div className="text-[11px] text-slate-500">
                    Pre-populated with full stack tech stack, projects, internships, and cloud certifications.
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleCreateNew('blank')}
                className="w-full p-3.5 text-left rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Completely Blank Canvas</div>
                  <div className="text-[11px] text-slate-500">
                    Start with empty fields and build your custom resume from scratch.
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
