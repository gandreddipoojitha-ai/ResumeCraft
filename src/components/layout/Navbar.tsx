import React, { useState } from 'react';
import { UserAccount } from '../../types/resume';
import { FileText, Sparkles, User, LogOut, Menu, X, PlusCircle, Bot } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'builder' | 'dashboard';
  onNavigate: (view: 'landing' | 'builder' | 'dashboard') => void;
  user: UserAccount | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  user,
  onOpenAuth,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'landing' | 'builder' | 'dashboard') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-2 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
            ResumeCraft
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
          <button
            onClick={() => handleNavClick('landing')}
            className={`hover:text-indigo-600 transition-colors ${currentView === 'landing' ? 'text-indigo-600' : ''}`}
          >
            Home
          </button>
          <a
            href="#templates-section"
            onClick={() => {
              if (currentView !== 'landing') handleNavClick('landing');
            }}
            className="hover:text-indigo-600 transition-colors"
          >
            Templates
          </a>
          <button
            onClick={() => handleNavClick('builder')}
            className={`hover:text-indigo-600 transition-colors ${currentView === 'builder' ? 'text-indigo-600' : ''}`}
          >
            Resume Builder
          </button>
          <a
            href="#features-section"
            onClick={() => {
              if (currentView !== 'landing') handleNavClick('landing');
            }}
            className="hover:text-indigo-600 transition-colors"
          >
            Features
          </a>
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`hover:text-indigo-600 transition-colors ${currentView === 'dashboard' ? 'text-indigo-600' : ''}`}
          >
            Dashboard
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-n8n-chat'))}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200/80 transition-all hover:scale-102 active:scale-98"
            title="Open n8n AI Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Chat</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          {user ? (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span>{user.name}</span>
              </button>
              <button
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Log In / Sign Up
            </button>
          )}

          <button
            onClick={() => handleNavClick('builder')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Resume</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleNavClick('landing')}
              className="text-left py-1.5 hover:text-indigo-600"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('builder')}
              className="text-left py-1.5 hover:text-indigo-600"
            >
              Resume Builder
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className="text-left py-1.5 hover:text-indigo-600"
            >
              Dashboard
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between text-xs text-slate-700 py-1">
                <span>Signed in as <strong>{user.name}</strong></span>
                <button onClick={onLogout} className="text-rose-600 font-semibold">
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg text-center"
              >
                Log In / Sign Up
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-n8n-chat'));
              }}
              className="w-full py-2 px-3 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>n8n AI Assistant</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </button>

            <button
              onClick={() => handleNavClick('builder')}
              className="w-full py-2.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg text-center shadow-xs"
            >
              Build Resume Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
