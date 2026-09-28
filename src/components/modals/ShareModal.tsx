import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { storageService } from '../../services/storageService';
import { X, Copy, Check, Download, Upload, Share2, Printer } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onImportResume?: (imported: ResumeData) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  resume,
  onImportResume,
}) => {
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState('');

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/#preview?id=${resume.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJson = () => {
    storageService.exportResumeAsJson(resume);
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError('');
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed.personal || !parsed.theme) {
          throw new Error('Invalid ResumeCraft JSON format');
        }
        parsed.id = 'resume-' + Math.random().toString(36).substring(2, 9);
        storageService.saveResume(parsed);
        if (onImportResume) onImportResume(parsed);
        onClose();
      } catch (err: any) {
        setImportError('Failed to import JSON file. Please ensure it is a valid ResumeCraft backup.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Share & Export Resume</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          {/* Share Link */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 block">Shareable Web Link</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-600 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-200 my-2" />

          {/* Quick Actions */}
          <div className="space-y-2.5">
            <span className="font-semibold text-slate-700 block">Export Options</span>
            
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <Printer className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-800">Print or Save as Vector PDF</div>
                  <div className="text-[11px] text-slate-500">Clean 100% vector printing via browser dialog</div>
                </div>
              </div>
            </button>

            <button
              onClick={handleExportJson}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                  <Download className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-800">Export Raw JSON Backup</div>
                  <div className="text-[11px] text-slate-500">Download resume data to import back anytime</div>
                </div>
              </div>
            </button>

            <label className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <Upload className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-800">Import ResumeCraft JSON</div>
                  <div className="text-[11px] text-slate-500">Restore from an exported backup file</div>
                </div>
              </div>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJsonFile}
                className="hidden"
              />
            </label>
          </div>

          {importError && (
            <p className="text-rose-600 text-xs bg-rose-50 p-2.5 rounded-lg border border-rose-200">
              {importError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
