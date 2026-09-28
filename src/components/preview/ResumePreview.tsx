import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { ModernTemplate } from '../templates/ModernTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';
import { ProfessionalTemplate } from '../templates/ProfessionalTemplate';
import { CreativeTemplate } from '../templates/CreativeTemplate';
import { StudentFresherTemplate } from '../templates/StudentFresherTemplate';
import { AtsTemplate } from '../templates/AtsTemplate';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, Printer, Download, Sparkles } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  onOpenAtsModal?: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, onOpenAtsModal }) => {
  const [zoom, setZoom] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const renderTemplateContent = () => {
    switch (data.theme.template) {
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'student':
        return <StudentFresherTemplate data={data} />;
      case 'ats':
        return <AtsTemplate data={data} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className={`flex flex-col h-full ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900/90 p-4 backdrop-blur-sm' : ''}`}>
      {/* Preview Header & Controls */}
      <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Live Preview
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium capitalize">
            {data.theme.template} Template
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onOpenAtsModal && (
            <button
              onClick={onOpenAtsModal}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
              title="Audit resume with ATS Scanner"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ATS Check</span>
            </button>
          )}

          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-md p-0.5">
            <button
              onClick={() => setZoom((z) => Math.max(z - 15, 60))}
              className="p-1 text-slate-600 hover:text-slate-900 rounded transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1.5 text-slate-600">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(z + 15, 140))}
              className="p-1 text-slate-600 hover:text-slate-900 rounded transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-white" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Print / Download Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-all"
            title="Download PDF via browser print dialog"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF / Print</span>
          </button>
        </div>
      </div>

      {/* Sheet Container */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-200/60 rounded-b-xl flex justify-center items-start">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="w-full max-w-[800px] shrink-0"
        >
          {/* Paper Canvas */}
          <div
            id="resume-document"
            className="w-full bg-white shadow-xl rounded-sm border border-slate-300 overflow-hidden min-h-[1050px]"
          >
            {renderTemplateContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
