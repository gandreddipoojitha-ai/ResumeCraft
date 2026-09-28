/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ResumeData, TemplateId, UserAccount } from './types/resume';
import { storageService } from './services/storageService';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { BuilderView } from './components/builder/BuilderView';
import { DashboardView } from './components/dashboard/DashboardView';
import { AtsModal } from './components/modals/AtsModal';
import { AiAssistantModal } from './components/modals/AiAssistantModal';
import { AuthModal } from './components/modals/AuthModal';
import { ShareModal } from './components/modals/ShareModal';
import { ContactModal, PrivacyModal, TermsModal } from './components/modals/PolicyModals';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'builder' | 'dashboard'>('landing');
  const [activeResumeId, setActiveResumeId] = useState<string>(() => storageService.getActiveResumeId());
  const [user, setUser] = useState<UserAccount | null>(() => storageService.getCurrentUser());

  // Modal States
  const [atsModalResume, setAtsModalResume] = useState<ResumeData | null>(null);
  const [aiHelperState, setAiHelperState] = useState<{
    isOpen: boolean;
    mode: 'summary' | 'project' | 'skills' | 'bullet' | 'grammar';
    context?: any;
  }>({
    isOpen: false,
    mode: 'summary',
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [shareModalResume, setShareModalResume] = useState<ResumeData | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Sync hash routing if user opens preview or direct links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#preview')) {
        const params = new URLSearchParams(hash.split('?')[1]);
        const id = params.get('id');
        if (id) {
          setActiveResumeId(id);
          setCurrentView('builder');
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleStartBuilder = (templateId?: TemplateId) => {
    if (templateId) {
      const current = storageService.getActiveResume();
      const updated = {
        ...current,
        theme: { ...current.theme, template: templateId },
      };
      storageService.saveResume(updated);
      setActiveResumeId(updated.id);
    }
    setCurrentView('builder');
  };

  const handleOpenBuilderWithResume = (resumeId?: string) => {
    if (resumeId) {
      setActiveResumeId(resumeId);
      storageService.setActiveResumeId(resumeId);
    }
    setCurrentView('builder');
  };

  const handleOpenAtsModal = (resume: ResumeData) => {
    setAtsModalResume(resume);
  };

  const handleOpenAiHelper = (
    mode: 'summary' | 'project' | 'skills' | 'bullet' | 'grammar',
    context?: any
  ) => {
    setAiHelperState({ isOpen: true, mode, context });
  };

  const handleApplyAiResult = (result: any) => {
    const current = storageService.getActiveResume();
    if (aiHelperState.mode === 'summary') {
      current.summary = result;
    } else if (aiHelperState.mode === 'skills') {
      current.skills = {
        technical: Array.from(new Set([...(current.skills.technical || []), ...(result.technical || [])])),
        soft: Array.from(new Set([...(current.skills.soft || []), ...(result.soft || [])])),
      };
    } else if (aiHelperState.mode === 'project' && result.projectId) {
      current.projects = current.projects.map((p) =>
        p.id === result.projectId ? { ...p, bulletPoints: result.bullets } : p
      );
    } else if (aiHelperState.mode === 'bullet' && result.expId) {
      current.experience = current.experience.map((e) =>
        e.id === result.expId ? { ...e, bulletPoints: result.bullets } : e
      );
    }
    storageService.saveResume(current);
    // Trigger re-render by setting active resume id
    setActiveResumeId(current.id);
  };

  const handleApplyKeywordsFromAts = (keywords: string[]) => {
    const current = storageService.getActiveResume();
    const existing = current.skills?.technical || [];
    current.skills = {
      ...current.skills,
      technical: Array.from(new Set([...existing, ...keywords])),
    };
    storageService.saveResume(current);
    setActiveResumeId(current.id);
    if (atsModalResume) {
      setAtsModalResume({ ...current });
    }
  };

  const handleLoginSuccess = (loggedInUser: UserAccount) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    storageService.logoutUser();
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <>
            <LandingPage
              onStartBuilder={handleStartBuilder}
              onExploreTemplates={() => {
                const elem = document.getElementById('templates-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <Footer
              onOpenContact={() => setIsContactOpen(true)}
              onOpenPrivacy={() => setIsPrivacyOpen(true)}
              onOpenTerms={() => setIsTermsOpen(true)}
              onNavigate={(v) => setCurrentView(v)}
            />
          </>
        )}

        {currentView === 'builder' && (
          <BuilderView
            resumeId={activeResumeId}
            onBackToDashboard={() => setCurrentView('dashboard')}
            onOpenAtsModal={handleOpenAtsModal}
            onOpenAiHelper={handleOpenAiHelper}
            onOpenShareModal={(resume) => setShareModalResume(resume)}
          />
        )}

        {currentView === 'dashboard' && (
          <>
            <div className="flex-1">
              <DashboardView
                user={user}
                onOpenBuilder={handleOpenBuilderWithResume}
                onOpenAtsModal={handleOpenAtsModal}
              />
            </div>
            <Footer
              onOpenContact={() => setIsContactOpen(true)}
              onOpenPrivacy={() => setIsPrivacyOpen(true)}
              onOpenTerms={() => setIsTermsOpen(true)}
              onNavigate={(v) => setCurrentView(v)}
            />
          </>
        )}
      </main>

      {/* MODALS */}
      {atsModalResume && (
        <AtsModal
          isOpen={!!atsModalResume}
          onClose={() => setAtsModalResume(null)}
          resumeData={atsModalResume}
          onApplyKeywords={handleApplyKeywordsFromAts}
        />
      )}

      {aiHelperState.isOpen && (
        <AiAssistantModal
          isOpen={aiHelperState.isOpen}
          onClose={() => setAiHelperState({ ...aiHelperState, isOpen: false })}
          mode={aiHelperState.mode}
          contextData={aiHelperState.context}
          onApply={handleApplyAiResult}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {shareModalResume && (
        <ShareModal
          isOpen={!!shareModalResume}
          onClose={() => setShareModalResume(null)}
          resume={shareModalResume}
          onImportResume={(imported) => {
            setActiveResumeId(imported.id);
            setCurrentView('builder');
          }}
        />
      )}

      {isContactOpen && (
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      )}

      {isPrivacyOpen && (
        <PrivacyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
        />
      )}

      {isTermsOpen && (
        <TermsModal
          isOpen={isTermsOpen}
          onClose={() => setIsTermsOpen(false)}
        />
      )}
    </div>
  );
}
