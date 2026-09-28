import React from 'react';
import { FontFamily, FontSize, SpacingSize, TemplateId, ThemeConfig } from '../../types/resume';
import { Type, Palette, MoveVertical, Sliders, LayoutTemplate } from 'lucide-react';
import { sampleTemplatesList } from '../../data/sampleResumes';

interface CustomizationBarProps {
  theme: ThemeConfig;
  onChange: (updatedTheme: ThemeConfig) => void;
}

const fonts: { label: string; value: FontFamily }[] = [
  { label: 'Plus Jakarta', value: 'Plus Jakarta Sans' },
  { label: 'Inter', value: 'Inter' },
  { label: 'Garamond', value: 'EB Garamond' },
  { label: 'Merriweather', value: 'Merriweather' },
  { label: 'JetBrains Mono', value: 'JetBrains Mono' },
];

const fontSizes: { label: string; value: FontSize }[] = [
  { label: 'Compact', value: 'sm' },
  { label: 'Regular', value: 'base' },
  { label: 'Large', value: 'lg' },
];

const spacings: { label: string; value: SpacingSize }[] = [
  { label: 'Tight', value: 'compact' },
  { label: 'Balanced', value: 'balanced' },
  { label: 'Spacious', value: 'spacious' },
];

const headingStyles: { label: string; value: ThemeConfig['headingStyle'] }[] = [
  { label: 'Bar', value: 'bar' },
  { label: 'Title', value: 'titlecase' },
  { label: 'Caps', value: 'uppercase' },
  { label: 'Line', value: 'underline' },
];

const colors = [
  { name: 'Indigo', hex: '#4F46E5' },
  { name: 'Navy', hex: '#1E3A8A' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Slate', hex: '#0F172A' },
  { name: 'Crimson', hex: '#E11D48' },
  { name: 'Violet', hex: '#7C3AED' },
  { name: 'Teal', hex: '#0D9488' },
  { name: 'Amber', hex: '#D97706' },
];

export const CustomizationBar: React.FC<CustomizationBarProps> = ({ theme, onChange }) => {
  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3 shrink-0 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-6 text-xs min-w-max">
        {/* Template Selector */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <LayoutTemplate className="w-3.5 h-3.5 text-slate-500" />
            <span>Template:</span>
          </span>
          <select
            value={theme.template}
            onChange={(e) => onChange({ ...theme, template: e.target.value as TemplateId })}
            className="px-2.5 py-1 text-xs font-medium bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 capitalize"
          >
            {sampleTemplatesList.map((tmpl) => (
              <option key={tmpl.id} value={tmpl.id}>
                {tmpl.name}
              </option>
            ))}
          </select>
        </div>

        {/* Font Selection */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-slate-500" />
            <span>Font:</span>
          </span>
          <div className="flex items-center bg-slate-100 p-0.5 rounded-md">
            {fonts.map((f) => (
              <button
                key={f.value}
                onClick={() => onChange({ ...theme, fontFamily: f.value })}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  theme.fontFamily === f.value
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color Palette */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-slate-500" />
            <span>Color:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => onChange({ ...theme, accentColor: c.hex })}
                className={`w-5 h-5 rounded-full transition-transform ${
                  theme.accentColor === c.hex ? 'ring-2 ring-offset-1 ring-slate-900 scale-110' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Spacing & Font Size */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">Size:</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-md">
              {fontSizes.map((s) => (
                <button
                  key={s.value}
                  onClick={() => onChange({ ...theme, fontSize: s.value })}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    theme.fontSize === s.value
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">Spacing:</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-md">
              {spacings.map((sp) => (
                <button
                  key={sp.value}
                  onClick={() => onChange({ ...theme, spacing: sp.value })}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    theme.spacing === sp.value
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">Heading:</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-md">
              {headingStyles.map((h) => (
                <button
                  key={h.value}
                  onClick={() => onChange({ ...theme, headingStyle: h.value })}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    theme.headingStyle === h.value
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
