import React from 'react';
import { ResumeData } from '../../types/resume';
import {
  getFontFamilyClass,
  getFontSizeClasses,
  getSpacingClasses,
  renderHeadingStyle,
} from './templateUtils';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Award, GraduationCap } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const StudentFresherTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, education, skills, projects, experience, certifications, achievements, languages, hobbies, theme } = data;
  const fontClass = getFontFamilyClass(theme.fontFamily);
  const sizeClasses = getFontSizeClasses(theme.fontSize);
  const spacingClasses = getSpacingClasses(theme.spacing);

  return (
    <div
      className={`bg-white text-slate-800 ${fontClass} ${sizeClasses.body} ${spacingClasses.padding} min-h-full`}
    >
      {/* Centered Academic Header */}
      <header className="text-center border-b border-slate-200 pb-4 mb-4">
        <h1
          className={`${sizeClasses.name} font-extrabold tracking-tight`}
          style={{ color: theme.accentColor || '#059669' }}
        >
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.jobTitle && (
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
            {personal.jobTitle}
          </p>
        )}

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 mt-2.5 text-xs text-slate-600">
          {personal.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.email}</span>
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.phone}</span>
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.location}</span>
            </span>
          )}
          {personal.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.linkedin}</span>
            </span>
          )}
          {personal.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.github}</span>
            </span>
          )}
          {personal.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.portfolio}</span>
            </span>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className={spacingClasses.sectionGap}>
        {/* Career Objective */}
        {summary && (
          <section className="resume-section-item">
            {renderHeadingStyle('Career Objective', theme.headingStyle, theme.accentColor || '#059669')}
            <p className="text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Education (Placed First for Freshers) */}
        {education && education.length > 0 && (
          <section className="resume-section-item">
            {renderHeadingStyle('Education', theme.headingStyle, theme.accentColor || '#059669')}
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="resume-section-item flex flex-col sm:flex-row sm:items-baseline sm:justify-between p-2 rounded-md bg-slate-50/70 border border-slate-100"
                >
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{edu.degree}</span>
                    </div>
                    <div className="text-xs text-slate-700 pl-5">
                      <span className="font-medium">{edu.college}</span>
                      {edu.university && <span> · {edu.university}</span>}
                      {edu.city && <span> ({edu.city})</span>}
                    </div>
                  </div>
                  <div className="text-right text-xs shrink-0 pl-5 sm:pl-0 mt-1 sm:mt-0">
                    <span className="font-medium text-slate-600 mr-2">{edu.year}</span>
                    {edu.cgpaOrPercentage && (
                      <span className="font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {edu.cgpaOrPercentage}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical & Soft Skills */}
        {((skills.technical && skills.technical.length > 0) || (skills.soft && skills.soft.length > 0)) && (
          <section className="resume-section-item">
            {renderHeadingStyle('Skills & Strengths', theme.headingStyle, theme.accentColor || '#059669')}
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

        {/* Academic & Personal Projects */}
        {projects && projects.length > 0 && (
          <section className="resume-section-item">
            {renderHeadingStyle('Academic & Personal Projects', theme.headingStyle, theme.accentColor || '#059669')}
            <div className={spacingClasses.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="resume-section-item">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="font-bold text-slate-900">{proj.projectName}</span>
                    {proj.projectLink && (
                      <span className="text-xs text-emerald-700 font-mono truncate max-w-xs">{proj.projectLink}</span>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-xs text-slate-500 font-medium">
                      Tools & Stack: <span className="text-slate-800">{proj.technologies}</span>
                    </div>
                  )}
                  {proj.description && <p className="text-slate-700 mt-1">{proj.description}</p>}
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

        {/* Internships & Experience */}
        {experience && experience.length > 0 && (
          <section className="resume-section-item">
            {renderHeadingStyle('Internships & Experience', theme.headingStyle, theme.accentColor || '#059669')}
            <div className={spacingClasses.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="resume-section-item">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{exp.jobTitle}</span>
                      <span className="text-slate-700 font-medium"> · {exp.company}</span>
                      {exp.location && <span className="text-slate-500 text-xs"> ({exp.location})</span>}
                    </div>
                    <span className="text-xs text-slate-600 font-medium shrink-0">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
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

        {/* Certifications & Achievements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications && certifications.length > 0 && (
            <section className="resume-section-item">
              {renderHeadingStyle('Certifications', theme.headingStyle, theme.accentColor || '#059669')}
              <div className="space-y-1.5 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-bold text-slate-900">{cert.name}</div>
                    <div className="text-slate-600 flex justify-between">
                      <span>{cert.issuer}</span>
                      <span>{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {achievements && achievements.length > 0 && (
            <section className="resume-section-item">
              {renderHeadingStyle('Honors & Achievements', theme.headingStyle, theme.accentColor || '#059669')}
              <div className="space-y-1.5 text-xs">
                {achievements.map((ach) => (
                  <div key={ach.id}>
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{ach.title}</span>
                      </span>
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
                <span className="font-bold text-slate-900">Extracurriculars: </span>
                <span className="text-slate-700">{hobbies.join(' · ')}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
