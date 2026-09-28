import React from 'react';
import { ResumeData } from '../../types/resume';
import {
  getFontFamilyClass,
  getFontSizeClasses,
} from './templateUtils';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, education, skills, projects, experience, certifications, achievements, languages, hobbies, theme } = data;
  const fontClass = getFontFamilyClass(theme.fontFamily);
  const sizeClasses = getFontSizeClasses(theme.fontSize);

  return (
    <div
      className={`bg-white text-slate-800 ${fontClass} ${sizeClasses.body} min-h-full flex flex-col sm:flex-row`}
    >
      {/* Left Sidebar */}
      <aside className="w-full sm:w-1/3 bg-slate-50 border-r border-slate-200 p-6 sm:p-7 space-y-6 shrink-0">
        {/* Personal Details */}
        <div>
          <div className="w-12 h-1.5 rounded-full mb-3" style={{ backgroundColor: theme.accentColor }} />
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">
            Contact Details
          </h2>
          <div className="space-y-2.5 text-xs text-slate-700">
            {personal.email && (
              <div className="flex items-start gap-2 break-all">
                <Mail className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-start gap-2 break-all">
                <Linkedin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-start gap-2 break-all">
                <Github className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>{personal.github}</span>
              </div>
            )}
            {personal.portfolio && (
              <div className="flex items-start gap-2 break-all">
                <Globe className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>{personal.portfolio}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education in Sidebar */}
        {education && education.length > 0 && (
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2.5">
              Education
            </h2>
            <div className="space-y-3 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600">{edu.college}</div>
                  {edu.university && <div className="text-slate-500 text-[11px]">{edu.university}</div>}
                  <div className="flex justify-between text-[11px] text-slate-500 mt-0.5">
                    <span>{edu.year}</span>
                    {edu.cgpaOrPercentage && <span className="font-semibold text-slate-800">{edu.cgpaOrPercentage}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills in Sidebar */}
        {((skills.technical && skills.technical.length > 0) || (skills.soft && skills.soft.length > 0)) && (
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2.5">
              Skills & Tools
            </h2>
            {skills.technical && skills.technical.length > 0 && (
              <div className="mb-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">
                  Technical
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.technical.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] font-medium rounded bg-white border border-slate-200 text-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft && skills.soft.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                  Interpersonal
                </span>
                <p className="text-xs text-slate-700 leading-snug">
                  {skills.soft.join(' · ')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Languages & Hobbies in Sidebar */}
        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
              Languages
            </h2>
            <div className="space-y-1 text-xs text-slate-700">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between">
                  <span>{l.language}</span>
                  <span className="text-slate-500 text-[11px]">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {hobbies && hobbies.length > 0 && (
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1.5">
              Interests
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {hobbies.join(' · ')}
            </p>
          </div>
        )}
      </aside>

      {/* Right Column */}
      <main className="w-full sm:w-2/3 p-6 sm:p-8 space-y-5">
        {/* Name and Title */}
        <header className="border-b border-slate-200 pb-4">
          <h1
            className={`${sizeClasses.name} font-black tracking-tight`}
            style={{ color: theme.accentColor }}
          >
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <p className="text-sm font-semibold text-slate-600 tracking-wide mt-1">
              {personal.jobTitle}
            </p>
          )}
        </header>

        {/* Summary */}
        {summary && (
          <section className="resume-section-item">
            <h2
              className="text-xs font-bold tracking-wider uppercase mb-1.5"
              style={{ color: theme.accentColor }}
            >
              About Me
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="resume-section-item">
            <h2
              className="text-xs font-bold tracking-wider uppercase mb-2"
              style={{ color: theme.accentColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id} className="resume-section-item">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{exp.jobTitle}</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-600">
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  {exp.description && <p className="text-slate-700 mt-1 text-xs">{exp.description}</p>}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs text-slate-700">
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
            <h2
              className="text-xs font-bold tracking-wider uppercase mb-2"
              style={{ color: theme.accentColor }}
            >
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="resume-section-item">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{proj.projectName}</span>
                    {proj.projectLink && <span className="text-xs text-indigo-600 font-mono truncate max-w-xs">{proj.projectLink}</span>}
                  </div>
                  {proj.technologies && (
                    <div className="text-[11px] font-medium text-slate-500 mb-0.5">
                      Tech: {proj.technologies}
                    </div>
                  )}
                  {proj.description && <p className="text-slate-700 text-xs">{proj.description}</p>}
                  {proj.bulletPoints && proj.bulletPoints.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs text-slate-700">
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

        {/* Certifications & Achievements */}
        {((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            {certifications && certifications.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Certifications
                </h3>
                <div className="space-y-1 text-xs">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-semibold text-slate-900">{c.name}</span>
                      <div className="text-[11px] text-slate-500">{c.issuer} ({c.year})</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {achievements && achievements.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Achievements
                </h3>
                <div className="space-y-1 text-xs">
                  {achievements.map((a) => (
                    <div key={a.id}>
                      <span className="font-semibold text-slate-900">{a.title}</span>
                      <div className="text-[11px] text-slate-500">{a.description || a.issuerOrEvent}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
