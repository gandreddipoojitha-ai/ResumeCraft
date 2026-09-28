import React, { useState } from 'react';
import { ResumeData, EducationItem, ProjectItem, ExperienceItem, CertificationItem, AchievementItem, LanguageItem } from '../../types/resume';
import {
  User,
  GraduationCap,
  Wrench,
  FolderGit2,
  Briefcase,
  Award,
  Trophy,
  Languages,
  Heart,
  Plus,
  Trash2,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

interface FormSectionsProps {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
  onOpenAiHelper: (mode: 'summary' | 'project' | 'skills' | 'bullet' | 'grammar', context?: any) => void;
}

export const FormSections: React.FC<FormSectionsProps> = ({ data, onChange, onOpenAiHelper }) => {
  const [activeTab, setActiveTab] = useState<
    'personal' | 'summary' | 'education' | 'skills' | 'projects' | 'experience' | 'certifications' | 'achievements' | 'languages' | 'hobbies'
  >('personal');

  // Helper updater
  const updateResume = (fields: Partial<ResumeData>) => {
    onChange({ ...data, ...fields });
  };

  const updatePersonal = (field: string, value: string) => {
    onChange({
      ...data,
      personal: { ...data.personal, [field]: value }
    });
  };

  // Education helpers
  const addEducation = () => {
    const newItem: EducationItem = {
      id: 'edu-' + Date.now(),
      degree: '',
      college: '',
      university: '',
      year: '',
      cgpaOrPercentage: '',
      city: '',
    };
    updateResume({ education: [...data.education, newItem] });
  };

  const removeEducation = (id: string) => {
    updateResume({ education: data.education.filter(e => e.id !== id) });
  };

  const updateEducation = (id: string, field: keyof EducationItem, val: string) => {
    updateResume({
      education: data.education.map(e => e.id === id ? { ...e, [field]: val } : e)
    });
  };

  // Skill helpers
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const addTechSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTechSkill.trim()) return;
    const current = data.skills?.technical || [];
    if (!current.includes(newTechSkill.trim())) {
      updateResume({
        skills: { ...data.skills, technical: [...current, newTechSkill.trim()] }
      });
    }
    setNewTechSkill('');
  };

  const removeTechSkill = (tag: string) => {
    updateResume({
      skills: {
        ...data.skills,
        technical: (data.skills?.technical || []).filter(t => t !== tag)
      }
    });
  };

  const addSoftSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSoftSkill.trim()) return;
    const current = data.skills?.soft || [];
    if (!current.includes(newSoftSkill.trim())) {
      updateResume({
        skills: { ...data.skills, soft: [...current, newSoftSkill.trim()] }
      });
    }
    setNewSoftSkill('');
  };

  const removeSoftSkill = (tag: string) => {
    updateResume({
      skills: {
        ...data.skills,
        soft: (data.skills?.soft || []).filter(t => t !== tag)
      }
    });
  };

  // Project helpers
  const addProject = () => {
    const newItem: ProjectItem = {
      id: 'proj-' + Date.now(),
      projectName: '',
      description: '',
      technologies: '',
      projectLink: '',
      bulletPoints: []
    };
    updateResume({ projects: [...data.projects, newItem] });
  };

  const removeProject = (id: string) => {
    updateResume({ projects: data.projects.filter(p => p.id !== id) });
  };

  const updateProject = (id: string, field: keyof ProjectItem, val: any) => {
    updateResume({
      projects: data.projects.map(p => p.id === id ? { ...p, [field]: val } : p)
    });
  };

  // Experience helpers
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: 'exp-' + Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      bulletPoints: []
    };
    updateResume({ experience: [...data.experience, newItem] });
  };

  const removeExperience = (id: string) => {
    updateResume({ experience: data.experience.filter(e => e.id !== id) });
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, val: any) => {
    updateResume({
      experience: data.experience.map(e => e.id === id ? { ...e, [field]: val } : e)
    });
  };

  // Certification helpers
  const addCertification = () => {
    const newItem: CertificationItem = {
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      year: '',
      credentialUrl: ''
    };
    updateResume({ certifications: [...(data.certifications || []), newItem] });
  };

  const removeCertification = (id: string) => {
    updateResume({ certifications: (data.certifications || []).filter(c => c.id !== id) });
  };

  const updateCertification = (id: string, field: keyof CertificationItem, val: string) => {
    updateResume({
      certifications: (data.certifications || []).map(c => c.id === id ? { ...c, [field]: val } : c)
    });
  };

  // Achievement helpers
  const addAchievement = () => {
    const newItem: AchievementItem = {
      id: 'ach-' + Date.now(),
      title: '',
      issuerOrEvent: '',
      year: '',
      description: ''
    };
    updateResume({ achievements: [...(data.achievements || []), newItem] });
  };

  const removeAchievement = (id: string) => {
    updateResume({ achievements: (data.achievements || []).filter(a => a.id !== id) });
  };

  const updateAchievement = (id: string, field: keyof AchievementItem, val: string) => {
    updateResume({
      achievements: (data.achievements || []).map(a => a.id === id ? { ...a, [field]: val } : a)
    });
  };

  // Languages helpers
  const addLanguage = () => {
    const newItem: LanguageItem = {
      id: 'lang-' + Date.now(),
      language: '',
      proficiency: 'Fluent'
    };
    updateResume({ languages: [...(data.languages || []), newItem] });
  };

  const removeLanguage = (id: string) => {
    updateResume({ languages: (data.languages || []).filter(l => l.id !== id) });
  };

  const updateLanguage = (id: string, field: keyof LanguageItem, val: any) => {
    updateResume({
      languages: (data.languages || []).map(l => l.id === id ? { ...l, [field]: val } : l)
    });
  };

  // Hobbies helpers
  const [newHobby, setNewHobby] = useState('');
  const addHobby = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newHobby.trim()) return;
    updateResume({ hobbies: [...(data.hobbies || []), newHobby.trim()] });
    setNewHobby('');
  };

  const removeHobby = (index: number) => {
    updateResume({ hobbies: (data.hobbies || []).filter((_, i) => i !== index) });
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User, count: data.personal.fullName ? 1 : 0 },
    { id: 'summary', label: 'Summary', icon: FileText, count: data.summary ? 1 : 0 },
    { id: 'education', label: 'Education', icon: GraduationCap, count: data.education.length },
    { id: 'skills', label: 'Skills', icon: Wrench, count: (data.skills?.technical?.length || 0) + (data.skills?.soft?.length || 0) },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: data.projects.length },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: data.experience.length },
    { id: 'certifications', label: 'Certifications', icon: Award, count: data.certifications?.length || 0 },
    { id: 'achievements', label: 'Achievements', icon: Trophy, count: data.achievements?.length || 0 },
    { id: 'languages', label: 'Languages', icon: Languages, count: data.languages?.length || 0 },
    { id: 'hobbies', label: 'Hobbies', icon: Heart, count: data.hobbies?.length || 0 },
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Horizontal Step Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1 shrink-0 no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                isActive
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-200 text-slate-600'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content Body of Selected Tab */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
        {/* PERSONAL INFO */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Personal Information</h3>
                <p className="text-xs text-slate-500">Provide clear and up-to-date contact information so recruiters can reach you.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.personal.fullName}
                  onChange={(e) => updatePersonal('fullName', e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Job Title / Headline
                </label>
                <input
                  type="text"
                  value={data.personal.jobTitle || ''}
                  onChange={(e) => updatePersonal('jobTitle', e.target.value)}
                  placeholder="e.g. Frontend Engineer / Fresher Computer Science"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={data.personal.email}
                  onChange={(e) => updatePersonal('email', e.target.value)}
                  placeholder="e.g. alex.morgan@email.com"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.personal.phone}
                  onChange={(e) => updatePersonal('phone', e.target.value)}
                  placeholder="e.g. +1 (555) 234-5678"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City & Country / State
                </label>
                <input
                  type="text"
                  value={data.personal.location}
                  onChange={(e) => updatePersonal('location', e.target.value)}
                  placeholder="e.g. San Francisco, CA or Bangalore, India"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  value={data.personal.linkedin}
                  onChange={(e) => updatePersonal('linkedin', e.target.value)}
                  placeholder="e.g. linkedin.com/in/alexmorgan"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GitHub Profile
                </label>
                <input
                  type="text"
                  value={data.personal.github}
                  onChange={(e) => updatePersonal('github', e.target.value)}
                  placeholder="e.g. github.com/alexmorgan"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Portfolio / Personal Website
                </label>
                <input
                  type="text"
                  value={data.personal.portfolio}
                  onChange={(e) => updatePersonal('portfolio', e.target.value)}
                  placeholder="e.g. alexmorgan.dev"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* SUMMARY / OBJECTIVE */}
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Career Objective / Professional Summary</h3>
                <p className="text-xs text-slate-500">A concise 2-3 sentence overview of your key capabilities and career ambitions.</p>
              </div>

              <button
                type="button"
                onClick={() => onOpenAiHelper('summary', { currentSummary: data.summary, field: data.personal.jobTitle })}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI Write / Enhance Summary</span>
              </button>
            </div>

            <div>
              <textarea
                rows={5}
                value={data.summary}
                onChange={(e) => updateResume({ summary: e.target.value })}
                placeholder="Write a brief professional summary or career objective highlighting your main strengths and career goals..."
                className="w-full p-3 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors leading-relaxed"
              />
              <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
                <span>Recommended: 40 - 80 words</span>
                <span>{data.summary ? data.summary.split(/\s+/).filter(Boolean).length : 0} words</span>
              </div>
            </div>

            {/* Quick Presets for Freshers */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <span className="text-xs font-semibold text-slate-700 block mb-2">Need ideas? Try quick templates:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => updateResume({
                    summary: 'Recent Computer Science graduate with solid foundations in software engineering principles, algorithms, and web development. Passionate about learning cutting-edge technologies and contributing to scalable, user-centric software projects.'
                  })}
                  className="text-xs px-2.5 py-1 rounded bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  Fresher CS Student
                </button>
                <button
                  type="button"
                  onClick={() => updateResume({
                    summary: 'Results-driven Full Stack Developer with practical project experience in building responsive web applications using React, Node.js, and SQL. Proactive problem solver skilled in clean code practices and agile collaboration.'
                  })}
                  className="text-xs px-2.5 py-1 rounded bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  Full Stack Developer
                </button>
                <button
                  type="button"
                  onClick={() => updateResume({
                    summary: 'Analytical and motivated graduate with strong quantitative reasoning and data visualization proficiencies. Dedicated to translating complex requirements into actionable business insights.'
                  })}
                  className="text-xs px-2.5 py-1 rounded bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  Data / Business Analyst
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Education</h3>
                <p className="text-xs text-slate-500">Degree, college/institution, university, year of completion, and CGPA/Percentage.</p>
              </div>
              <button
                type="button"
                onClick={addEducation}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Education</span>
              </button>
            </div>

            {data.education.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-600">No education entries added yet.</p>
                <button
                  type="button"
                  onClick={addEducation}
                  className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  + Add Degree / School
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={edu.id} className="p-4 bg-slate-50/60 rounded-xl border border-slate-200 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Education #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeEducation(edu.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Degree / Course <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="e.g. B.Tech in Computer Science and Engineering"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          College / School Institution <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.college}
                          onChange={(e) => updateEducation(edu.id, 'college', e.target.value)}
                          placeholder="e.g. National Institute of Technology"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          University / Affiliated Board
                        </label>
                        <input
                          type="text"
                          value={edu.university}
                          onChange={(e) => updateEducation(edu.id, 'university', e.target.value)}
                          placeholder="e.g. State Technical University / CBSE"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Year of Graduation / Duration <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                          placeholder="e.g. 2021 - 2025"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          CGPA / Percentage / Grade
                        </label>
                        <input
                          type="text"
                          value={edu.cgpaOrPercentage}
                          onChange={(e) => updateEducation(edu.id, 'cgpaOrPercentage', e.target.value)}
                          placeholder="e.g. 8.9 / 10 CGPA or 88.5%"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          City / State
                        </label>
                        <input
                          type="text"
                          value={edu.city || ''}
                          onChange={(e) => updateEducation(edu.id, 'city', e.target.value)}
                          placeholder="e.g. Bangalore, India"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Skills</h3>
                <p className="text-xs text-slate-500">Highlight technical competencies, frameworks, tools, and interpersonal skills.</p>
              </div>

              <button
                type="button"
                onClick={() => onOpenAiHelper('skills', { field: data.personal.jobTitle })}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI Suggest Skills for My Role</span>
              </button>
            </div>

            {/* Technical Skills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
                Technical Skills (Languages, Frameworks, Databases, Tools)
              </label>

              <form onSubmit={addTechSkill} className="flex gap-2">
                <input
                  type="text"
                  value={newTechSkill}
                  onChange={(e) => setNewTechSkill(e.target.value)}
                  placeholder="e.g. React.js, Python, PostgreSQL, Git (press Enter)"
                  className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Add
                </button>
              </form>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(data.skills?.technical || []).map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-800 rounded-md border border-slate-200"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeTechSkill(skill)}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
                Soft Skills (Teamwork, Leadership, Communication, Problem Solving)
              </label>

              <form onSubmit={addSoftSkill} className="flex gap-2">
                <input
                  type="text"
                  value={newSoftSkill}
                  onChange={(e) => setNewSoftSkill(e.target.value)}
                  placeholder="e.g. Critical Thinking, Time Management (press Enter)"
                  className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Add
                </button>
              </form>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(data.skills?.soft || []).map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-800 rounded-md border border-indigo-100"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSoftSkill(skill)}
                      className="text-indigo-400 hover:text-rose-600 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Projects</h3>
                <p className="text-xs text-slate-500">Showcase individual, team, or academic projects with technologies and impact.</p>
              </div>
              <button
                type="button"
                onClick={addProject}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            {data.projects.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-600">No projects added yet.</p>
                <button
                  type="button"
                  onClick={addProject}
                  className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  + Add First Project
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {data.projects.map((proj, idx) => (
                  <div key={proj.id} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Project #{idx + 1}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenAiHelper('project', {
                            projectName: proj.projectName,
                            technologies: proj.technologies,
                            currentDescription: proj.description,
                            projectId: proj.id
                          })}
                          className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-white px-2 py-1 rounded border border-indigo-200"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-500" />
                          <span>AI Enhance</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeProject(proj.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Project Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={proj.projectName}
                          onChange={(e) => updateProject(proj.id, 'projectName', e.target.value)}
                          placeholder="e.g. Smart Campus Navigation App"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Technologies Used
                        </label>
                        <input
                          type="text"
                          value={proj.technologies}
                          onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                          placeholder="e.g. React, Node.js, Express, MongoDB, Tailwind CSS"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Project Link / GitHub URL
                        </label>
                        <input
                          type="text"
                          value={proj.projectLink || ''}
                          onChange={(e) => updateProject(proj.id, 'projectLink', e.target.value)}
                          placeholder="e.g. github.com/username/project or live demo link"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Overview Description
                        </label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                          placeholder="Brief description of the problem solved and core features..."
                          className="w-full p-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-medium text-slate-700">
                            Key Bullet Points (Recommended for ATS)
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const bullets = proj.bulletPoints || [];
                              updateProject(proj.id, 'bulletPoints', [...bullets, '']);
                            }}
                            className="text-xs text-indigo-600 font-medium hover:underline"
                          >
                            + Add Bullet Point
                          </button>
                        </div>

                        {(proj.bulletPoints || []).map((bp, bpIdx) => (
                          <div key={bpIdx} className="flex gap-2">
                            <input
                              type="text"
                              value={bp}
                              onChange={(e) => {
                                const newBullets = [...(proj.bulletPoints || [])];
                                newBullets[bpIdx] = e.target.value;
                                updateProject(proj.id, 'bulletPoints', newBullets);
                              }}
                              placeholder="e.g. Engineered responsive interface reducing load times by 30%..."
                              className="flex-1 px-3 py-1 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newBullets = (proj.bulletPoints || []).filter((_, i) => i !== bpIdx);
                                updateProject(proj.id, 'bulletPoints', newBullets);
                              }}
                              className="text-slate-400 hover:text-rose-500 px-1"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WORK EXPERIENCE / INTERNSHIPS */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Internships & Work Experience</h3>
                <p className="text-xs text-slate-500">Employment history, summer internships, apprentice roles, or contract positions.</p>
              </div>
              <button
                type="button"
                onClick={addExperience}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Experience</span>
              </button>
            </div>

            {data.experience.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-600">No work experience or internships added yet.</p>
                <button
                  type="button"
                  onClick={addExperience}
                  className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  + Add Experience / Internship
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Role #{idx + 1}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenAiHelper('bullet', {
                            role: exp.jobTitle,
                            company: exp.company,
                            rawInput: exp.description,
                            expId: exp.id
                          })}
                          className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-white px-2 py-1 rounded border border-indigo-200"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-500" />
                          <span>AI STAR Bullets</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeExperience(exp.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Job / Internship Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                          placeholder="e.g. Software Development Intern"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Company / Organization <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="e.g. Google, Infosys, Startup Labs"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Location (City, Country / Remote)
                        </label>
                        <input
                          type="text"
                          value={exp.location || ''}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          placeholder="e.g. Remote / Seattle, WA"
                          className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            placeholder="e.g. May 2024"
                            className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">End Date</label>
                          <input
                            type="text"
                            disabled={exp.current}
                            value={exp.current ? 'Present' : exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            placeholder="e.g. Aug 2024"
                            className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>I currently work here</span>
                        </label>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Role Summary / Notes
                        </label>
                        <textarea
                          rows={2}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          placeholder="Summary of responsibilities and technologies used..."
                          className="w-full p-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-medium text-slate-700">
                            Key Achievements & STAR Bullet Points
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const bullets = exp.bulletPoints || [];
                              updateExperience(exp.id, 'bulletPoints', [...bullets, '']);
                            }}
                            className="text-xs text-indigo-600 font-medium hover:underline"
                          >
                            + Add Bullet Point
                          </button>
                        </div>

                        {(exp.bulletPoints || []).map((bp, bpIdx) => (
                          <div key={bpIdx} className="flex gap-2">
                            <input
                              type="text"
                              value={bp}
                              onChange={(e) => {
                                const newBullets = [...(exp.bulletPoints || [])];
                                newBullets[bpIdx] = e.target.value;
                                updateExperience(exp.id, 'bulletPoints', newBullets);
                              }}
                              placeholder="e.g. Accelerated API response by 25% by implementing Redis caching..."
                              className="flex-1 px-3 py-1 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newBullets = (exp.bulletPoints || []).filter((_, i) => i !== bpIdx);
                                updateExperience(exp.id, 'bulletPoints', newBullets);
                              }}
                              className="text-slate-400 hover:text-rose-500 px-1"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Certifications</h3>
                <p className="text-xs text-slate-500">Industry licenses, cloud credentials, or coursework certificates.</p>
              </div>
              <button
                type="button"
                onClick={addCertification}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Certification</span>
              </button>
            </div>

            {(!data.certifications || data.certifications.length === 0) ? (
              <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-600">No certifications added.</p>
                <button
                  type="button"
                  onClick={addCertification}
                  className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  + Add First Certificate
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full">
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                        placeholder="Certificate Name (e.g. AWS Cloud Practitioner)"
                        className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
                      />
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                        placeholder="Issuer (e.g. AWS, Coursera, Oracle)"
                        className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
                      />
                      <input
                        type="text"
                        value={cert.year}
                        onChange={(e) => updateCertification(cert.id, 'year', e.target.value)}
                        placeholder="Year (e.g. 2024)"
                        className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCertification(cert.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACHIEVEMENTS */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Honors & Achievements</h3>
                <p className="text-xs text-slate-500">Hackathon victories, scholarships, dean's lists, or coding competitions.</p>
              </div>
              <button
                type="button"
                onClick={addAchievement}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Achievement</span>
              </button>
            </div>

            {(!data.achievements || data.achievements.length === 0) ? (
              <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <Trophy className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-600">No achievements recorded yet.</p>
                <button
                  type="button"
                  onClick={addAchievement}
                  className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  + Add First Honor / Award
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {data.achievements.map((ach) => (
                  <div key={ach.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={ach.title}
                        onChange={(e) => updateAchievement(ach.id, 'title', e.target.value)}
                        placeholder="Honor / Award Title (e.g. 1st Place - Tech Hackathon 2024)"
                        className="flex-1 px-2.5 py-1 text-xs font-bold bg-white border border-slate-300 rounded mr-2"
                      />
                      <button
                        type="button"
                        onClick={() => removeAchievement(ach.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={ach.issuerOrEvent}
                        onChange={(e) => updateAchievement(ach.id, 'issuerOrEvent', e.target.value)}
                        placeholder="Organization / Event (e.g. IEEE Chapter)"
                        className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
                      />
                      <input
                        type="text"
                        value={ach.year}
                        onChange={(e) => updateAchievement(ach.id, 'year', e.target.value)}
                        placeholder="Year (e.g. 2024)"
                        className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
                      />
                    </div>
                    <input
                      type="text"
                      value={ach.description}
                      onChange={(e) => updateAchievement(ach.id, 'description', e.target.value)}
                      placeholder="Brief details or impact (e.g. Selected among 150+ teams nationally)"
                      className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LANGUAGES */}
        {activeTab === 'languages' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Languages</h3>
                <p className="text-xs text-slate-500">List spoken and written languages with fluency levels.</p>
              </div>
              <button
                type="button"
                onClick={addLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Language</span>
              </button>
            </div>

            {(!data.languages || data.languages.length === 0) ? (
              <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <Languages className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-600">No languages specified.</p>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  + Add Language
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded border border-slate-200">
                    <input
                      type="text"
                      value={l.language}
                      onChange={(e) => updateLanguage(l.id, 'language', e.target.value)}
                      placeholder="e.g. English, Spanish, Hindi, German"
                      className="flex-1 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
                    />
                    <select
                      value={l.proficiency}
                      onChange={(e) => updateLanguage(l.id, 'proficiency', e.target.value)}
                      className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded"
                    >
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Professional">Professional Working</option>
                      <option value="Conversational">Conversational</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeLanguage(l.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HOBBIES / INTERESTS */}
        {activeTab === 'hobbies' && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-semibold text-slate-900">Hobbies & Interests</h3>
              <p className="text-xs text-slate-500">Show personality, extracurricular passions, or sports.</p>
            </div>

            <form onSubmit={addHobby} className="flex gap-2">
              <input
                type="text"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                placeholder="e.g. Open Source, Competitive Coding, Chess, Photography (press Enter)"
                className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                Add
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {(data.hobbies || []).map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-slate-100 text-slate-800 rounded-md border border-slate-200"
                >
                  <span>{h}</span>
                  <button
                    type="button"
                    onClick={() => removeHobby(i)}
                    className="text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
