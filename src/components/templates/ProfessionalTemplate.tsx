import React from 'react';
import { ResumeData } from '../../types/resume';
import {
  getFontFamilyClass,
  getFontSizeClasses,
  getSpacingClasses,
} from './templateUtils';

interface TemplateProps {
  data: ResumeData;
}

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, education, skills, projects, experience, certifications, achievements, languages, hobbies, theme } = data;
  const fontClass = getFontFamilyClass(theme.fontFamily || 'EB Garamond');
  const sizeClasses = getFontSizeClasses(theme.fontSize);
  const spacingClasses = getSpacingClasses(theme.spacing);

  return (
    <div
      className={`bg-white text-slate-900 ${fontClass} ${sizeClasses.body} min-h-full`}
    >
      {/* Executive Header Banner */}
      <header
        className="px-8 py-6 text-white"
        style={{ backgroundColor: theme.accentColor || '#1E3A8A' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h1 className={`${sizeClasses.name} font-bold tracking-wide uppercase`}>
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="text-sm tracking-wider text-slate-100 font-medium mt-0.5">
                {personal.jobTitle}
              </p>
            )}
          </div>
          <div className="text-xs text-slate-100 space-y-0.5 sm:text-right">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
          </div>
        </div>

        {(personal.linkedin || personal.github || personal.portfolio) && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-200 mt-3 pt-2 border-t border-white/20">
            {personal.linkedin && <span>LinkedIn: {personal.linkedin}</span>}
            {personal.github && <span>GitHub: {personal.github}</span>}
            {personal.portfolio && <span>Portfolio: {personal.portfolio}</span>}
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className={`p-8 sm:p-10 ${spacingClasses.sectionGap}`}>
        {/* Summary */}
        {summary && (
          <section className="resume-section-item">
            <h2
              className="text-xs uppercase font-bold tracking-widest border-b-2 pb-1 mb-2"
              style={{ borderColor: theme.accentColor || '#1E3A8A', color: theme.accentColor || '#1E3A8A' }}
            >
              Executive Summary
            </h2>
            <p className="text-slate-800 leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="resume-section-item">
            <h2
              className="text-xs uppercase font-bold tracking-widest border-b-2 pb-1 mb-2.5"
              style={{ borderColor: theme.accentColor || '#1E3A8A', color: theme.accentColor || '#1E3A8A' }}
            >
              Professional Experience
            </h2>
            <div className={spacingClasses.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="resume-section-item">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{exp.jobTitle}</span>
                      <span className="text-slate-700 font-medium"> | {exp.company}</span>
                      {exp.location && <span className="text-slate-500 text-xs"> — {exp.location}</span>}
                    </div>
                    <span className="text-xs text-slate-600 font-semibold shrink-0">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-slate-700 mt-1">{exp.description}</p>}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-slate-700">
                      {exp.bulletPoints.map((bp, i) => (
                        <li key={i}>{bp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="resume-section-item">
            <h2
              className="text-xs uppercase font-bold tracking-widest border-b-2 pb-1 mb-2.5"
              style={{ borderColor: theme.accentColor || '#1E3A8A', color: theme.accentColor || '#1E3A8A' }}
            >
              Education & Academic Credentials
            </h2>
            <div className={spacingClasses.itemGap}>
              {education.map((edu) => (
                <div key={edu.id} className="resume-section-item flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <div className="text-xs text-slate-600">
                      {edu.college}{edu.university ? `, ${edu.university}` : ''}
                      {edu.city ? ` — ${edu.city}` : ''}
                    </div>
                  </div>
                  <div className="text-right text-xs shrink-0 mt-0.5 sm:mt-0">
                    <span className="font-semibold text-slate-700">{edu.year}</span>
                    {edu.cgpaOrPercentage && (
                      <span className="ml-2 font-bold text-slate-900">({edu.cgpaOrPercentage})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        {projects && projects.length > 0 && (
          <section className="resume-section-item">
            <h2
              className="text-xs uppercase font-bold tracking-widest border-b-2 pb-1 mb-2.5"
              style={{ borderColor: theme.accentColor || '#1E3A8A', color: theme.accentColor || '#1E3A8A' }}
            >
              Key Projects & Initiatives
            </h2>
            <div className={spacingClasses.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="resume-section-item">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{proj.projectName}</span>
                    {proj.projectLink && <span className="text-xs text-slate-500 font-mono">{proj.projectLink}</span>}
                  </div>
                  {proj.technologies && (
                    <div className="text-xs text-slate-600 mb-0.5 italic">
                      Core Stack: {proj.technologies}
                    </div>
                  )}
                  {proj.description && <p className="text-slate-700">{proj.description}</p>}
                  {proj.bulletPoints && proj.bulletPoints.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-slate-700">
                      {proj.bulletPoints.map((bp, i) => (
                        <li key={i}>{bp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {((skills.technical && skills.technical.length > 0) || (skills.soft && skills.soft.length > 0)) && (
          <section className="resume-section-item">
            <h2
              className="text-xs uppercase font-bold tracking-widest border-b-2 pb-1 mb-2"
              style={{ borderColor: theme.accentColor || '#1E3A8A', color: theme.accentColor || '#1E3A8A' }}
            >
              Areas of Expertise & Skills
            </h2>
            <div className="text-xs space-y-1 text-slate-800">
              {skills.technical && skills.technical.length > 0 && (
                <div>
                  <span className="font-bold text-slate-900">Technical Expertise: </span>
                  <span>{skills.technical.join(' | ')}</span>
                </div>
              )}
              {skills.soft && skills.soft.length > 0 && (
                <div>
                  <span className="font-bold text-slate-900">Leadership & Interpersonal: </span>
                  <span>{skills.soft.join(' | ')}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Certifications & Honors */}
        {((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {certifications && certifications.length > 0 && (
              <section className="resume-section-item">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b pb-0.5">
                  Certifications
                </h3>
                <div className="space-y-1">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-semibold text-slate-900">{c.name}</span>
                      <span className="text-slate-600"> — {c.issuer} ({c.year})</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {achievements && achievements.length > 0 && (
              <section className="resume-section-item">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b pb-0.5">
                  Honors & Recognition
                </h3>
                <div className="space-y-1">
                  {achievements.map((a) => (
                    <div key={a.id}>
                      <span className="font-semibold text-slate-900">{a.title}</span>
                      <span className="text-slate-600"> ({a.year})</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Languages & Additional Interests */}
        {((languages && languages.length > 0) || (hobbies && hobbies.length > 0)) && (
          <div className="text-xs text-slate-700 border-t border-slate-200 pt-3 flex flex-wrap gap-x-8 gap-y-1">
            {languages && languages.length > 0 && (
              <div>
                <span className="font-bold text-slate-900">Languages: </span>
                <span>{languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}</span>
              </div>
            )}
            {hobbies && hobbies.length > 0 && (
              <div>
                <span className="font-bold text-slate-900">Interests: </span>
                <span>{hobbies.join(' · ')}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
