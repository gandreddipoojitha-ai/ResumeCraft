import React, { useState } from 'react';
import { sampleTemplatesList } from '../../data/sampleResumes';
import { TemplateId } from '../../types/resume';
import heroImage from '../../assets/images/resume_builder_hero_1790581573604.jpg';
import {
  FileText,
  Sparkles,
  ShieldCheck,
  Download,
  Eye,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Layers,
  Zap,
  GraduationCap,
  Award,
  Users
} from 'lucide-react';

interface LandingPageProps {
  onStartBuilder: (templateId?: TemplateId) => void;
  onExploreTemplates: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartBuilder,
  onExploreTemplates,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is ResumeCraft suitable for students and freshers without work experience?',
      a: 'Absolutely! ResumeCraft includes a dedicated Student / Fresher template specifically architected to highlight academic achievements, degree coursework, CGPA/percentage, technical projects, and certifications ahead of traditional work history.'
    },
    {
      q: 'How does the ATS Check work?',
      a: 'Applicant Tracking Systems (ATS) scan resumes for clear section headings, parseable contact metadata, standard fonts, and keyword density. Our ATS Check audits your resume against real-world recruiter criteria and provides targeted suggestions and missing keyword recommendations.'
    },
    {
      q: 'Will downloading my resume as a PDF preserve formatting?',
      a: 'Yes! ResumeCraft uses dedicated print-vector stylesheets that render your resume to exact standard page dimensions (A4/Letter) with razor-sharp typography, ensuring what you see in the live preview is identical to what hiring managers receive.'
    },
    {
      q: 'Can I switch templates without losing my resume data?',
      a: 'Yes, 100%. All your personal information, work experience, education, and skills are stored independently from the presentation layer. You can switch between Modern, Minimal, Professional, Creative, Student, and ATS-friendly templates at any time with a single click.'
    },
    {
      q: 'How does the AI assistance help me write my resume?',
      a: 'Our built-in AI assistant helps you write professional career objectives, optimize project descriptions using Google’s XYZ formula, suggest role-specific technical skills, and polish grammatical tone without sounding robotic.'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 pb-12 overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-100/70 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Next-Generation Resume Builder with AI</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Build Your Professional Resume in Minutes
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Create a professional, ATS-friendly resume quickly and easily. Built for students, freshers, and job seekers looking to land more interviews.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onStartBuilder()}
                  className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Create My Resume</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#templates-section"
                  className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors text-center"
                >
                  View Templates
                </a>
              </div>

              {/* Trust Points */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Free & No Sign-up Required</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ATS-Optimized Formatting</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant Vector PDF Export</span>
                </span>
              </div>
            </div>

            {/* Right Hero Illustration */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                <img
                  src={heroImage}
                  alt="ResumeCraft Professional Resume Builder Preview"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                      95
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">ATS Pass Rating</div>
                      <div className="text-[10px] text-slate-500">Workday & Greenhouse Compatible</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Simple 3-Step Process</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How ResumeCraft Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Craft a job-winning resume without wrestling with broken margins, misaligned bullet points, or complex design tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-extrabold flex items-center justify-center mb-4 text-base">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Pick a Proven Template</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose from 6 curated templates tested with top employers—including Modern, Minimal, Creative, and Student/Fresher formats.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 font-extrabold flex items-center justify-center mb-4 text-base">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Fill with AI Writing Assistance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your experience or use our AI assistant to generate professional career summaries, STAR-format bullet points, and domain skills.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold flex items-center justify-center mb-4 text-base">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">ATS Check & 1-Click PDF</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Run the instant ATS Auditor to identify missing keywords, adjust colors/fonts, and download a pixel-perfect PDF ready for application portals.
            </p>
          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Built for Success</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Features Tailored for Students & Job Seekers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to turn your academic projects and internships into interview invitations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Real-Time Live Preview</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              See every letter, date, and project update in a side-by-side paper canvas as you type with zero rendering delay.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">ATS Resume Scanner</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scan your resume against modern Applicant Tracking System standards. Discover missing keywords, format traps, and section gaps.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">AI Writing Assistant</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Stuck on your summary or project bullets? Gemini AI crafts high-impact accomplishment bullets using the Google XYZ formula.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Student & Fresher Modes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Specialized formatting for campus placements that highlights degree coursework, CGPA/percentage, and hackathon projects first.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Vector PDF & Print Ready</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              1-click vector PDF generation with pure typography and zero visual compression artifacts or awkward page break cuts.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Full Template Customization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Personalize font families, sizes, heading styles, and accent colors to match your individual style while preserving your data.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TEMPLATES SHOWCASE */}
      <section id="templates-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Pick Your Style</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            6 Industry-Approved Resume Templates
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Switch between templates anytime without re-typing a single line of information.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleTemplatesList.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-indigo-400 transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{tmpl.name}</span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                    style={{ backgroundColor: `${tmpl.previewColor}15`, color: tmpl.previewColor }}
                  >
                    {tmpl.badge}
                  </span>
                </div>

                {/* Simulated Mini Resume Thumbnail */}
                <div className="h-32 bg-slate-50 rounded-xl border border-slate-200 p-3 space-y-2 relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="w-20 h-2.5 rounded" style={{ backgroundColor: tmpl.previewColor }} />
                    <div className="w-14 h-1.5 bg-slate-300 rounded" />
                  </div>
                  <div className="space-y-1 border-t border-slate-200 pt-2">
                    <div className="w-28 h-1.5 bg-slate-400 rounded" />
                    <div className="w-full h-1 bg-slate-200 rounded" />
                    <div className="w-4/5 h-1 bg-slate-200 rounded" />
                  </div>
                  <div className="flex gap-1.5 pt-1">
                    <div className="w-8 h-1 bg-slate-300 rounded" />
                    <div className="w-8 h-1 bg-slate-300 rounded" />
                    <div className="w-8 h-1 bg-slate-300 rounded" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{tmpl.desc}</p>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => onStartBuilder(tmpl.id as TemplateId)}
                  className="w-full py-2 px-3 text-xs font-semibold text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: tmpl.previewColor }}
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="faq-section" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Frequently Asked Questions</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We Have Answers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Learn more about how ResumeCraft helps you build an impactful resume.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-800 hover:text-indigo-600"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join thousands of students, freshers, and professionals who have built winning resumes with ResumeCraft.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onStartBuilder()}
              className="px-6 py-3 text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Build My Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
