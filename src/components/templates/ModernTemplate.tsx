import React from 'react';
import { ResumeData } from '../../types/resume';
import {
  getFontFamilyClass,
  getFontSizeClasses,
  getSpacingClasses,
  renderHeadingStyle,
} from './templateUtils';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, education, skills, projects, experience, certifications, achievements, languages, hobbies, theme } = data;
  const fontClass = getFontFamilyClass(theme.fontFamily);
  const sizeClasses = getFontSizeClasses(theme.fontSize);
  const spacingClasses = getSpacingClasses(theme.spacing);

  return (
    <div
      className={`bg-white text-slate-800 ${fontClass} ${sizeClasses.body} ${spacingClasses.padding} min-h-full`}
    >
      {/* Header */}
      <header className="border-b border-slate-200 pb-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <div>
            <h1
              className={`${sizeClasses.name} font-extrabold tracking-tight`}
              style={{ color: theme.accentColor }}
            >
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className={`${sizeClasses.title} font-medium text-slate-600 mt-0.5`}>
                {personal.jobTitle}
              </p>
            )}
          </div>
        </div>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-slate-600 text-xs">
          {personal.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{personal.email}</span>
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{personal.phone}</span>
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{personal.location}</span>
            </span>
          )}
          {personal.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{personal.linkedin}</span>
            </span>
          )}
          {personal.github && (
            <span className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{personal.github}</span>
            </span>
          )}
          {personal.portfolio && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{personal.portfolio}</span>
            </span>
          )}
        </div>
      </header>

      {/* Main Body */}
      <div className={spacingClasses.sectionGap}>
        {/* Summary */}
        {summary && (
          <section className="resume-section-item">
            {renderHeadingStyle('Professional Summary', theme.headingStyle, theme.accentColor)}
            <p className="text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="resume-section-item">
            {renderHeadingStyle('Experience', theme.headingStyle, theme.accentColor)}
            <div className={spacingClasses.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="resume-section-item">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{exp.jobTitle}</span>
                      <span className="text-slate-700"> · {exp.company}</span>
                      {exp.location && <span className="text-slate-500 text-xs"> ({exp.location})</span>}
                    </div>
                    <span className="text-xs text-slate-500 font-medium shrink-0">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-slate-700 mt-1">{exp.description}</p>
                  )}
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

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="resume-section-item">
            {renderHeadingStyle('Projects', theme.headingStyle, theme.accentColor)}
            <div className={spacingClasses.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="resume-section-item">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="font-bold text-slate-900">{proj.projectName}</span>
                    {proj.projectLink && (
                      <span className="text-xs text-indigo-600 truncate max-w-xs">{proj.projectLink}</span>
                    )}
                  </div>
                  {proj.technologies && (
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      Technologies: <span className="font-normal text-slate-700">{proj.technologies}</span>
                    </p>
                  )}
                  {proj.description && (
                    <p className="text-slate-700 mt-1">{proj.description}</p>
                  )}
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

        {/* Education */}
        {education && education.length > 0 && (
          <section className="resume-section-item">
            {renderHeadingStyle('Education', theme.headingStyle, theme.accentColor)}
            <div className={spacingClasses.itemGap}>
              {education.map((edu) => (
                <div key={edu.id} className="resume-section-item flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-700 text-xs">
                      {edu.college}
                      {edu.university && ` · ${edu.university}`}
                      {edu.city && ` · ${edu.city}`}
                    </div>
                  </div>
                  <div className="text-right text-xs shrink-0 mt-0.5 sm:mt-0">
                    <div className="font-medium text-slate-600">{edu.year}</div>
                    {edu.cgpaOrPercentage && (
                      <div className="font-semibold" style={{ color: theme.accentColor }}>
                        {edu.cgpaOrPercentage}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {((skills.technical && skills.technical.length > 0) || (skills.soft && skills.soft.length > 0)) && (
          <section className="resume-section-item">
            {renderHeadingStyle('Skills & Competencies', theme.headingStyle, theme.accentColor)}
            <div className="space-y-1.5 text-xs">
              {skills.technical && skills.technical.length > 0 && (
                <div>
                  <span className="font-bold text-slate-900">Technical Skills: </span>
                  <span className="text-slate-700">{skills.technical.join(' · ')}</span>
                </div>
              )}
              {skills.soft && skills.soft.length > 0 && (
                <div>
                  <span className="font-bold text-slate-900">Soft Skills: </span>
                  <span className="text-slate-700">{skills.soft.join(' · ')}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Certifications & Achievements in 2 columns if both exist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications && certifications.length > 0 && (
            <section className="resume-section-item">
              {renderHeadingStyle('Certifications', theme.headingStyle, theme.accentColor)}
              <div className="space-y-1.5 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <div>
                      <div className="font-semibold text-slate-900">{cert.name}</div>
                      <div className="text-slate-500">{cert.issuer}</div>
                    </div>
                    <span className="text-slate-500 shrink-0">{cert.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {achievements && achievements.length > 0 && (
            <section className="resume-section-item">
              {renderHeadingStyle('Achievements', theme.headingStyle, theme.accentColor)}
              <div className="space-y-1.5 text-xs">
                {achievements.map((ach) => (
                  <div key={ach.id}>
                    <div className="flex justify-between font-semibold text-slate-900">
                      <span>{ach.title}</span>
                      <span className="text-slate-500 font-normal">{ach.year}</span>
                    </div>
                    {ach.description && <div className="text-slate-600 mt-0.5">{ach.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Languages & Hobbies */}
        {((languages && languages.length > 0) || (hobbies && hobbies.length > 0)) && (
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs border-t border-slate-100 pt-3">
            {languages && languages.length > 0 && (
              <div>
                <span className="font-bold text-slate-900">Languages: </span>
                <span className="text-slate-700">
                  {languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
                </span>
              </div>
            )}
            {hobbies && hobbies.length > 0 && (
              <div>
                <span className="font-bold text-slate-900">Interests: </span>
                <span className="text-slate-700">{hobbies.join(' · ')}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
