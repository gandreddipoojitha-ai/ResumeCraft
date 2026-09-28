import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { Sparkles, X, Check, Copy, RefreshCw, ArrowRight } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'summary' | 'project' | 'skills' | 'bullet' | 'grammar';
  contextData?: any;
  onApply: (appliedResult: any) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  mode,
  contextData,
  onApply,
}) => {
  const [loading, setLoading] = useState(false);
  const [summaryRole, setSummaryRole] = useState(contextData?.field || 'Software Engineer');
  const [summaryLevel, setSummaryLevel] = useState('Entry-Level / Fresher');
  const [summaryCurrent, setSummaryCurrent] = useState(contextData?.currentSummary || '');
  const [summaryResults, setSummaryResults] = useState<{ title: string; text: string }[]>([]);

  // Project Enhancement State
  const [projName, setProjName] = useState(contextData?.projectName || '');
  const [projTech, setProjTech] = useState(contextData?.technologies || '');
  const [projDesc, setProjDesc] = useState(contextData?.currentDescription || '');
  const [projBullets, setProjBullets] = useState<string[]>([]);

  // Skills Suggestion State
  const [skillField, setSkillField] = useState(contextData?.field || 'Web Development');
  const [suggestedSkills, setSuggestedSkills] = useState<{ technical: string[]; soft: string[] } | null>(null);

  // Bullet Point Generator State
  const [bulletRole, setBulletRole] = useState(contextData?.role || '');
  const [bulletCompany, setBulletCompany] = useState(contextData?.company || '');
  const [bulletRaw, setBulletRaw] = useState(contextData?.rawInput || '');
  const [generatedBullets, setGeneratedBullets] = useState<string[]>([]);

  // Grammar Fixer State
  const [grammarInput, setGrammarInput] = useState('');
  const [grammarOutput, setGrammarOutput] = useState<{ improvedText: string; changesMade: string[] } | null>(null);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const res = await aiService.enhanceSummary({
        currentSummary: summaryCurrent,
        field: summaryRole,
        experienceLevel: summaryLevel,
      });
      setSummaryResults(res.options || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEnhanceProject = async () => {
    setLoading(true);
    try {
      const res = await aiService.enhanceProject({
        projectName: projName,
        technologies: projTech,
        currentDescription: projDesc,
      });
      setProjBullets(res.bullets || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestSkills = async () => {
    setLoading(true);
    try {
      const res = await aiService.suggestSkills({ field: skillField });
      setSuggestedSkills(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBullets = async () => {
    setLoading(true);
    try {
      const res = await aiService.generateBulletPoints({
        role: bulletRole,
        company: bulletCompany,
        rawInput: bulletRaw,
      });
      setGeneratedBullets(res.bullets || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFixGrammar = async () => {
    if (!grammarInput.trim()) return;
    setLoading(true);
    try {
      const res = await aiService.fixGrammar({ text: grammarInput });
      setGrammarOutput(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50/60 to-purple-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {mode === 'summary' && 'AI Professional Summary Writer'}
                {mode === 'project' && 'AI Project Enhancer & Bullet Points'}
                {mode === 'skills' && 'AI Domain Skills Suggester'}
                {mode === 'bullet' && 'AI STAR Experience Bullet Points'}
                {mode === 'grammar' && 'AI Grammar & Active Voice Fixer'}
              </h2>
              <p className="text-xs text-slate-500">
                Powered by Gemini AI for professional resume optimization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content based on mode */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* 1. SUMMARY WRITER */}
          {mode === 'summary' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Field / Role</label>
                  <input
                    type="text"
                    value={summaryRole}
                    onChange={(e) => setSummaryRole(e.target.value)}
                    placeholder="e.g. Full Stack Developer, Data Analyst"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Level</label>
                  <select
                    value={summaryLevel}
                    onChange={(e) => setSummaryLevel(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Entry-Level / Fresher">College Student / Fresher</option>
                    <option value="Junior (1-2 years)">Junior Engineer (1-2 yrs)</option>
                    <option value="Mid-Level (3-5 years)">Mid-Level Professional (3-5 yrs)</option>
                    <option value="Career Switcher">Career Switcher / Transitioning</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Draft or Key Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={summaryCurrent}
                  onChange={(e) => setSummaryCurrent(e.target.value)}
                  placeholder="Paste rough notes or existing summary to refine..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={handleGenerateSummary}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{loading ? 'Generating 3 Tailored Versions...' : 'Generate 3 AI Summaries'}</span>
              </button>

              {summaryResults.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide block">
                    Choose Your Favorite Option:
                  </span>
                  {summaryResults.map((opt, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 hover:bg-indigo-50/40 rounded-xl border border-slate-200 transition-colors space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-900">{opt.title}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopy(opt.text, idx)}
                            className="p-1 text-slate-400 hover:text-slate-700 text-xs flex items-center gap-1"
                          >
                            {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => {
                              onApply(opt.text);
                              onClose();
                            }}
                            className="px-2.5 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                          >
                            Apply to Resume
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed text-justify">{opt.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. PROJECT ENHANCER */}
          {mode === 'project' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={projName}
                    onChange={(e) => setProjName(e.target.value)}
                    placeholder="e.g. Distributed Task Manager"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Technologies Used</label>
                  <input
                    type="text"
                    value={projTech}
                    onChange={(e) => setProjTech(e.target.value)}
                    placeholder="e.g. React, Express, Redis, PostgreSQL"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">What did this project accomplish?</label>
                <textarea
                  rows={2}
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  placeholder="e.g. Built a real-time web application for teams to assign and track tasks with status updates"
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={handleEnhanceProject}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Generate High-Impact Project Bullets (XYZ Formula)</span>
              </button>

              {projBullets.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide block">
                    Generated Action Bullets:
                  </span>
                  <div className="space-y-2">
                    {projBullets.map((bullet, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex gap-2 justify-between items-start">
                        <span className="text-slate-800 leading-relaxed">• {bullet}</span>
                        <button
                          onClick={() => handleCopy(bullet, idx)}
                          className="text-slate-400 hover:text-slate-700 shrink-0 p-1"
                        >
                          {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      onApply({ bullets: projBullets, projectId: contextData?.projectId });
                      onClose();
                    }}
                    className="w-full py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                  >
                    Add These Bullets to Project
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. SKILLS SUGGESTER */}
          {mode === 'skills' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Discipline or Job Title</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillField}
                    onChange={(e) => setSkillField(e.target.value)}
                    placeholder="e.g. Full Stack Developer, Data Scientist, UI/UX Designer"
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSuggestSkills}
                    disabled={loading}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg shrink-0 transition-colors"
                  >
                    {loading ? 'Finding Skills...' : 'Suggest Skills'}
                  </button>
                </div>
              </div>

              {suggestedSkills && (
                <div className="space-y-4 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">Recommended Technical Skills:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedSkills.technical.map((s, idx) => (
                        <span key={idx} className="px-2.5 py-1 text-xs bg-white text-slate-800 rounded-md border border-slate-200 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-2">
                    <span className="text-xs font-bold text-indigo-900 block">Recommended Soft Skills:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedSkills.soft.map((s, idx) => (
                        <span key={idx} className="px-2.5 py-1 text-xs bg-white text-indigo-800 rounded-md border border-indigo-200 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onApply(suggestedSkills);
                      onClose();
                    }}
                    className="w-full py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    Apply All Suggested Skills to Resume
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 4. STAR BULLET GENERATOR */}
          {mode === 'bullet' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={bulletRole}
                    onChange={(e) => setBulletRole(e.target.value)}
                    placeholder="e.g. Software Engineer Intern"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={bulletCompany}
                    onChange={(e) => setBulletCompany(e.target.value)}
                    placeholder="e.g. TechCorp"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Rough Notes on Tasks / Results</label>
                <textarea
                  rows={3}
                  value={bulletRaw}
                  onChange={(e) => setBulletRaw(e.target.value)}
                  placeholder="e.g. worked on bug fixes, improved dashboard loading, attended daily standups, wrote tests"
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <button
                onClick={handleGenerateBullets}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Generate STAR-Method Bullets</span>
              </button>

              {generatedBullets.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide block">
                    STAR Bullet Points:
                  </span>
                  <div className="space-y-2">
                    {generatedBullets.map((bullet, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex gap-2 justify-between items-start">
                        <span className="text-slate-800 leading-relaxed">• {bullet}</span>
                        <button
                          onClick={() => handleCopy(bullet, idx)}
                          className="text-slate-400 hover:text-slate-700 shrink-0 p-1"
                        >
                          {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      onApply({ bullets: generatedBullets, expId: contextData?.expId });
                      onClose();
                    }}
                    className="w-full py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                  >
                    Add These Bullets to Experience
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 5. GRAMMAR FIXER */}
          {mode === 'grammar' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Enter Text to Polish</label>
                <textarea
                  rows={4}
                  value={grammarInput}
                  onChange={(e) => setGrammarInput(e.target.value)}
                  placeholder="Paste any sentence or paragraph here to elevate tone and eliminate passive voice..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <button
                onClick={handleFixGrammar}
                disabled={loading || !grammarInput.trim()}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Fix Grammar & Active Voice</span>
              </button>

              {grammarOutput && (
                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-emerald-900 block mb-1">Polished Version:</span>
                    <p className="text-slate-800 bg-white p-3 rounded-lg border border-emerald-100 leading-relaxed">
                      {grammarOutput.improvedText}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onApply(grammarOutput.improvedText);
                      onClose();
                    }}
                    className="w-full py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                  >
                    Use Polished Text
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
