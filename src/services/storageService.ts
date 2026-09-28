import { ResumeData, UserAccount } from '../types/resume';
import { initialBlankResume, fresherStudentResume } from '../data/sampleResumes';

const RESUMES_STORAGE_KEY = 'resumecraft_saved_resumes_v1';
const ACTIVE_ID_KEY = 'resumecraft_active_resume_id';
const USER_KEY = 'resumecraft_user_session';

export const storageService = {
  // Resumes
  getSavedResumes(): ResumeData[] {
    try {
      const data = localStorage.getItem(RESUMES_STORAGE_KEY);
      if (!data) {
        // Pre-populate with sample resumes so user starts with great data
        const initial = [initialBlankResume, fresherStudentResume];
        localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [initialBlankResume];
    } catch (e) {
      console.error('Failed reading resumes from localStorage:', e);
      return [initialBlankResume];
    }
  },

  saveResume(resume: ResumeData): void {
    try {
      const existing = this.getSavedResumes();
      const updatedResume = { ...resume, lastModified: Date.now() };
      const index = existing.findIndex((r) => r.id === resume.id);

      let newList: ResumeData[];
      if (index >= 0) {
        newList = [...existing];
        newList[index] = updatedResume;
      } else {
        newList = [updatedResume, ...existing];
      }

      localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(newList));
      this.setActiveResumeId(updatedResume.id);
    } catch (e) {
      console.error('Failed saving resume to localStorage:', e);
    }
  },

  deleteResume(id: string): ResumeData[] {
    try {
      const existing = this.getSavedResumes();
      const filtered = existing.filter((r) => r.id !== id);
      const finalList = filtered.length > 0 ? filtered : [initialBlankResume];
      localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(finalList));
      if (this.getActiveResumeId() === id) {
        this.setActiveResumeId(finalList[0].id);
      }
      return finalList;
    } catch (e) {
      console.error('Failed deleting resume:', e);
      return [initialBlankResume];
    }
  },

  duplicateResume(id: string): ResumeData {
    const existing = this.getSavedResumes();
    const source = existing.find((r) => r.id === id) || initialBlankResume;
    const duplicated: ResumeData = {
      ...JSON.parse(JSON.stringify(source)),
      id: 'resume-' + Math.random().toString(36).substring(2, 9),
      title: `${source.title} (Copy)`,
      lastModified: Date.now(),
    };
    this.saveResume(duplicated);
    return duplicated;
  },

  createNewResume(preset?: 'blank' | 'student' | 'developer'): ResumeData {
    const newId = 'resume-' + Math.random().toString(36).substring(2, 9);
    let base = initialBlankResume;
    if (preset === 'student') base = fresherStudentResume;

    const newResume: ResumeData = {
      ...JSON.parse(JSON.stringify(base)),
      id: newId,
      title: preset === 'student' ? 'My Fresher Resume' : 'Untitled Resume',
      lastModified: Date.now(),
    };

    if (preset === 'blank') {
      newResume.personal = {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        portfolio: ''
      };
      newResume.summary = '';
      newResume.education = [];
      newResume.skills = { technical: [], soft: [] };
      newResume.projects = [];
      newResume.experience = [];
      newResume.certifications = [];
      newResume.achievements = [];
      newResume.languages = [];
      newResume.hobbies = [];
    }

    this.saveResume(newResume);
    return newResume;
  },

  getActiveResumeId(): string {
    return localStorage.getItem(ACTIVE_ID_KEY) || initialBlankResume.id;
  },

  setActiveResumeId(id: string): void {
    localStorage.setItem(ACTIVE_ID_KEY, id);
  },

  getActiveResume(): ResumeData {
    const list = this.getSavedResumes();
    const activeId = this.getActiveResumeId();
    return list.find((r) => r.id === activeId) || list[0] || initialBlankResume;
  },

  // Export / Import
  exportResumeAsJson(resume: ResumeData): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    const safeTitle = (resume.personal.fullName || resume.title || 'resume').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    downloadAnchor.setAttribute('download', `${safeTitle}_resumecraft.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  // Auth User Session
  getCurrentUser(): UserAccount | null {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveUserSession(user: UserAccount): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  logoutUser(): void {
    localStorage.removeItem(USER_KEY);
  }
};
