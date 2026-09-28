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

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, education, skills, projects, experience, certifications, achievements, languages, hobbies, theme } = data;
  const fontClass = getFontFamilyClass(theme.fontFamily);
  const sizeClasses = getFontSizeClasses(theme.fontSize);
  const spacingClasses = getSpacingClasses(theme.spacing);

  return (
    <div
      className={`bg-white text-neutral-900 ${fontClass} ${sizeClasses.body} ${spacingClasses.padding} min-h-full leading-normal`}
    >
      {/* Header */}
      <header className="mb-6">
        <h1 className={`${sizeClasses.name} font-light tracking-tight text-neutral-950 uppercase`}>
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.jobTitle && (
          <p className="text-xs tracking-widest text-neutral-500 uppercase mt-1">
            {personal.jobTitle}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-xs text-neutral-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>·</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>·</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>·</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>·</span>}
          {personal.github && <span>{personal.github}</span>}
          {personal.portfolio && <span>·</span>}
          {personal.portfolio && <span>{personal.portfolio}</span>}
        </div>
        <div className="h-0.5 bg-neutral-900 w-12 mt-4" />
      </header>

      {/* Body Sections */}
      <div className={spacingClasses.sectionGap}>
        {/* Summary */}
        {summary && (
          <section className="resume-section-item">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-1.5">
              Profile
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="resume-section-item">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-2">
              Experience
            </h2>
            <div className={spacingClasses.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="resume-section-item">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-neutral-900">{exp.jobTitle}</span>
                    <span className="text-xs text-neutral-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-600 italic">
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  {exp.description && <p className="text-neutral-700 mt-1">{exp.description}</p>}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-neutral-700">
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
            <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-2">
              Selected Projects
            </h2>
            <div className={spacingClasses.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="resume-section-item">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-neutral-900">{proj.projectName}</span>
                    {proj.projectLink && (
                      <span className="text-xs text-neutral-500 font-mono">{proj.projectLink}</span>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-xs text-neutral-500 mb-1">{proj.technologies}</div>
                  )}
                  {proj.description && <p className="text-neutral-700">{proj.description}</p>}
                  {proj.bulletPoints && proj.bulletPoints.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-neutral-700">
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
            <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-2">
              Education
            </h2>
            <div className={spacingClasses.itemGap}>
              {education.map((edu) => (
                <div key={edu.id} className="resume-section-item flex justify-between items-baseline">
                  <div>
                    <div className="font-semibold text-neutral-900">{edu.degree}</div>
                    <div className="text-xs text-neutral-600">
                      {edu.college}{edu.university ? ` (${edu.university})` : ''}
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div>{edu.year}</div>
                    {edu.cgpaOrPercentage && <div className="font-medium text-neutral-700">{edu.cgpaOrPercentage}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {((skills.technical && skills.technical.length > 0) || (skills.soft && skills.soft.length > 0)) && (
          <section className="resume-section-item">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-1.5">
              Skills
            </h2>
            <div className="text-xs space-y-1 text-neutral-700">
              {skills.technical && skills.technical.length > 0 && (
                <div>
                  <span className="font-semibold text-neutral-900">Technical: </span>
                  <span>{skills.technical.join(', ')}</span>
                </div>
              )}
              {skills.soft && skills.soft.length > 0 && (
                <div>
                  <span className="font-semibold text-neutral-900">Core Competencies: </span>
                  <span>{skills.soft.join(', ')}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Certifications & Achievements */}
        {((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {certifications && certifications.length > 0 && (
              <section className="resume-section-item">
                <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-1.5">
                  Certifications
                </h2>
                <div className="space-y-1">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-semibold">{c.name}</span> — <span className="text-neutral-600">{c.issuer} ({c.year})</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {achievements && achievements.length > 0 && (
              <section className="resume-section-item">
                <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-1.5">
                  Achievements
                </h2>
                <div className="space-y-1">
                  {achievements.map((a) => (
                    <div key={a.id}>
                      <span className="font-semibold">{a.title}</span> ({a.year})
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Languages & Hobbies */}
        {((languages && languages.length > 0) || (hobbies && hobbies.length > 0)) && (
          <div className="text-xs text-neutral-600 border-t border-neutral-100 pt-3 flex flex-wrap gap-x-6 gap-y-1">
            {languages && languages.length > 0 && (
              <div>
                <span className="font-semibold text-neutral-900">Languages: </span>
                <span>{languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}</span>
              </div>
            )}
            {hobbies && hobbies.length > 0 && (
              <div>
                <span className="font-semibold text-neutral-900">Interests: </span>
                <span>{hobbies.join(' · ')}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
