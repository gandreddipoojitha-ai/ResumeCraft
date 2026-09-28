import React, { useState, useEffect } from 'react';
import { AtsAuditResult, ResumeData } from '../../types/resume';
import { aiService } from '../../services/aiService';
import { X, CheckCircle, AlertTriangle, Sparkles, RefreshCw, PlusCircle, ShieldCheck } from 'lucide-react';

interface AtsModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onApplyKeywords: (keywords: string[]) => void;
}

export const AtsModal: React.FC<AtsModalProps> = ({
  isOpen,
  onClose,
  resumeData,
  onApplyKeywords,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<AtsAuditResult | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>(resumeData.personal.jobTitle || 'Software Engineer');

  const runAudit = async () => {
    setLoading(true);
    try {
      const res = await aiService.runAtsCheck({
        resumeData,
        targetRole: selectedRole,
      });
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      runAudit();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">ATS Resume Scanner & Auditor</h2>
              <p className="text-xs text-slate-500">Applicant Tracking System machine readability & keyword match evaluation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Target Role Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-xs">
              <span className="font-semibold text-slate-700 block">Target Role Evaluation:</span>
              <span className="text-slate-500">Tailors keyword detection and scoring to this discipline</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={runAudit}
                disabled={loading}
                className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-md transition-colors shrink-0"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                <span>Re-scan</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-14 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Auditing resume structure & parsing keywords...</p>
              <p className="text-xs text-slate-400">Scanning contact info, headers, typography, and ATS compatibility criteria</p>
            </div>
          ) : result ? (
            <>
              {/* Score Display Banner */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                <div className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center border-2 shrink-0 ${getScoreColor(result.score)}`}>
                  <span className="text-3xl font-extrabold tabular-nums tracking-tight">
                    {result.score}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider">ATS Score</span>
                </div>

                <div className="space-y-1.5 text-center sm:text-left">
                  <h3 className="text-sm font-bold text-slate-900">
                    {result.score >= 85 ? 'Excellent ATS Readiness' : result.score >= 70 ? 'Good Baseline with Opportunities' : 'Needs Formatting & Content Updates'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {result.summary}
                  </p>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Detailed Category Breakdown
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {Object.entries(result.breakdown || {}).map(([key, item]: [string, any]) => (
                    <div key={key} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between items-center font-semibold">
                        <span className="capitalize text-slate-800">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className={`px-2 py-0.5 rounded font-mono text-[11px] ${
                          item.score >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {item.score}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">{item.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Verified Strengths</span>
                  </h4>
                  <ul className="text-xs text-emerald-900 space-y-1.5 list-disc list-outside ml-4">
                    {result.strengths.map((str, i) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 space-y-2">
                  <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Recommended Adjustments</span>
                  </h4>
                  <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-outside ml-4">
                    {result.improvements.map((imp, i) => (
                      <li key={i}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggested Missing Keywords */}
              {result.suggestedKeywords && result.suggestedKeywords.length > 0 && (
                <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Suggested High-Impact Keywords</span>
                    </h4>
                    <button
                      onClick={() => onApplyKeywords(result.suggestedKeywords)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-indigo-700 hover:text-indigo-900"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Add All to Skills</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.suggestedKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-medium bg-white text-indigo-800 rounded-md border border-indigo-200"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
