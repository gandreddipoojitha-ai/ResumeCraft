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

export const AtsTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, education, skills, projects, experience, certifications, achievements, languages, hobbies, theme } = data;
  const fontClass = getFontFamilyClass(theme.fontFamily || 'Inter');
  const sizeClasses = getFontSizeClasses(theme.fontSize);
  const spacingClasses = getSpacingClasses(theme.spacing);

  return (
    <div
      className={`bg-white text-black ${fontClass} ${sizeClasses.body} ${spacingClasses.padding} min-h-full leading-normal`}
    >
      {/* Strict ATS Machine Readable Header */}
      <header className="border-b border-black pb-3 mb-4">
        <h1 className={`${sizeClasses.name} font-bold text-black`}>
          {personal.fullName || 'YOUR NAME'}
        </h1>
        {personal.jobTitle && (
          <p className="text-sm font-semibold text-neutral-800 mt-0.5">
            {personal.jobTitle}
          </p>
        )}

        <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1.5 text-xs text-neutral-800">
          {personal.location && <span>{personal.location}</span>}
          {personal.phone && <span>| {personal.phone}</span>}
          {personal.email && <span>| {personal.email}</span>}
          {personal.linkedin && <span>| {personal.linkedin}</span>}
          {personal.github && <span>| {personal.github}</span>}
          {personal.portfolio && <span>| {personal.portfolio}</span>}
        </div>
      </header>

      {/* Single Column Strict ATS Flow */}
      <div className={spacingClasses.sectionGap}>
        {/* Professional Summary */}
        {summary && (
          <section className="resume-section-item">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 text-black">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-neutral-900 leading-relaxed">
              {summary}
            </p>
          </section>
        )}

        {/* Technical & Soft Skills */}
        {((skills.technical && skills.technical.length > 0) || (skills.soft && skills.soft.length > 0)) && (
          <section className="resume-section-item">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 text-black">
              CORE COMPETENCIES & SKILLS
            </h2>
            <div className="text-xs space-y-1 text-neutral-900">
              {skills.technical && skills.technical.length > 0 && (
                <div>
                  <span className="font-bold">Technical Skills: </span>
                  <span>{skills.technical.join(', ')}</span>
                </div>
              )}
              {skills.soft && skills.soft.length > 0 && (
                <div>
                  <span className="font-bold">Professional Skills: </span>
                  <span>{skills.soft.join(', ')}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section className="resume-section-item">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 text-black">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className={spacingClasses.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="resume-section-item">
                  <div className="flex justify-between items-baseline font-bold text-neutral-950">
                    <span>{exp.jobTitle} - {exp.company}</span>
                    <span className="text-xs font-normal">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && <div className="text-xs text-neutral-700 italic">{exp.location}</div>}
                  {exp.description && <p className="text-neutral-900 mt-1">{exp.description}</p>}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-neutral-900">
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

        {/* Key Projects */}
        {projects && projects.length > 0 && (
          <section className="resume-section-item">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 text-black">
              PROJECTS
            </h2>
            <div className={spacingClasses.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="resume-section-item">
                  <div className="flex justify-between items-baseline font-bold text-neutral-950">
                    <span>{proj.projectName}</span>
                    {proj.projectLink && <span className="text-xs font-normal font-mono">{proj.projectLink}</span>}
                  </div>
                  {proj.technologies && (
                    <div className="text-xs text-neutral-800">
                      <span className="font-semibold">Technologies: </span>{proj.technologies}
                    </div>
                  )}
                  {proj.description && <p className="text-neutral-900 mt-0.5">{proj.description}</p>}
                  {proj.bulletPoints && proj.bulletPoints.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-neutral-900">
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
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 text-black">
              EDUCATION
            </h2>
            <div className={spacingClasses.itemGap}>
              {education.map((edu) => (
                <div key={edu.id} className="resume-section-item flex justify-between items-baseline">
                  <div>
                    <div className="font-bold text-neutral-950">{edu.degree}</div>
                    <div className="text-xs text-neutral-800">
                      {edu.college}{edu.university ? `, ${edu.university}` : ''}
                      {edu.city ? ` - ${edu.city}` : ''}
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div>{edu.year}</div>
                    {edu.cgpaOrPercentage && <div className="font-semibold">{edu.cgpaOrPercentage}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="resume-section-item">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1 text-black">
              CERTIFICATIONS
            </h2>
            <div className="space-y-1 text-xs text-neutral-900">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <span>
                    <strong>{cert.name}</strong> - {cert.issuer}
                  </span>
                  <span>{cert.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <section className="resume-section-item">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1 text-black">
              HONORS & AWARDS
            </h2>
            <div className="space-y-1 text-xs text-neutral-900">
              {achievements.map((ach) => (
                <div key={ach.id} className="flex justify-between">
                  <span>
                    <strong>{ach.title}</strong>
                    {ach.description ? ` - ${ach.description}` : ''}
                  </span>
                  <span>{ach.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages & Hobbies */}
        {((languages && languages.length > 0) || (hobbies && hobbies.length > 0)) && (
          <div className="text-xs text-neutral-900 border-t border-neutral-300 pt-2 space-y-1">
            {languages && languages.length > 0 && (
              <div>
                <strong>Languages: </strong>
                <span>{languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}</span>
              </div>
            )}
            {hobbies && hobbies.length > 0 && (
              <div>
                <strong>Interests: </strong>
                <span>{hobbies.join(', ')}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
