import { ResumeData } from '../types/resume';

export const initialBlankResume: ResumeData = {
  id: 'resume-default',
  title: 'My Professional Resume',
  lastModified: Date.now(),
  personal: {
    fullName: 'Alex Morgan',
    jobTitle: 'Software Engineer & Full Stack Developer',
    email: 'alex.morgan@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan-dev',
    github: 'github.com/alexmorgan',
    portfolio: 'alexmorgan.dev',
  },
  summary: 'Motivated software engineer with experience building scalable web applications with React, TypeScript, and Node.js. Passionate about clean architecture, performance optimization, and developing intuitive user experiences in agile team environments.',
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Science and Engineering',
      college: 'University Institute of Technology',
      university: 'State Technical University',
      year: '2021 - 2025',
      cgpaOrPercentage: '8.8 / 10 CGPA',
      city: 'San Francisco, CA',
    },
    {
      id: 'edu-2',
      degree: 'Higher Secondary Certificate (Science & Mathematics)',
      college: 'St. Xavier Senior Secondary School',
      university: 'State Board of Education',
      year: '2019 - 2021',
      cgpaOrPercentage: '92.4%',
      city: 'San Jose, CA',
    }
  ],
  skills: {
    technical: [
      'JavaScript / TypeScript',
      'React.js',
      'Node.js & Express',
      'HTML5 & Tailwind CSS',
      'Python',
      'SQL & PostgreSQL',
      'Git & GitHub',
      'RESTful APIs',
      'Docker Basics'
    ],
    soft: [
      'Problem Solving',
      'Cross-Functional Collaboration',
      'Agile / Scrum Methodologies',
      'Technical Documentation',
      'Adaptability & Rapid Learning'
    ]
  },
  projects: [
    {
      id: 'proj-1',
      projectName: 'DevFlow - Real-Time Collaborative Workspace',
      description: 'Built a collaborative markdown editor and code snippet manager featuring live multi-user editing, granular access controls, and syntax highlighting.',
      technologies: 'React, TypeScript, Tailwind CSS, Node.js, WebSockets',
      projectLink: 'github.com/alexmorgan/devflow',
      bulletPoints: [
        'Architected real-time synchronization utilizing WebSockets, supporting up to 50 concurrent active editors per session.',
        'Optimized component rendering cycle, reducing client memory footprint by 28% and ensuring sub-50ms keystroke latency.',
        'Integrated responsive dark/light themes and keyboard shortcuts, improving daily workflow velocity for active developer users.'
      ]
    },
    {
      id: 'proj-2',
      projectName: 'ShopEase - E-Commerce Platform & Order Management',
      description: 'Engineered a modern web storefront with product filtering, cart persistence, automated invoice generation, and mock payment gateway integration.',
      technologies: 'React, Redux Toolkit, Express, MongoDB, Stripe API',
      projectLink: 'github.com/alexmorgan/shopease',
      bulletPoints: [
        'Developed end-to-end checkout flow with comprehensive form validation and state caching via Redux Toolkit.',
        'Implemented elastic product search and category filtering with debounced query execution for snappy user response.',
        'Achieved a 95+ Google Lighthouse performance score through code splitting and asset preloading.'
      ]
    }
  ],
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'Software Engineering Intern',
      company: 'Nexis Cloud Solutions',
      location: 'San Francisco, CA',
      startDate: 'Jun 2024',
      endDate: 'Aug 2024',
      current: false,
      description: 'Contributed to front-end redesign and automated integration test pipelines for enterprise client dashboards.',
      bulletPoints: [
        'Built 12+ modular React UI components in adherence to corporate design systems, expediting feature releases by 2 weeks.',
        'Assisted senior engineers in refactoring legacy REST endpoints, slashing payload sizes by 35% across high-traffic analytics screens.',
        'Authored comprehensive unit and integration test suites achieving 88% branch coverage on core transaction flows.'
      ]
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      year: '2024',
      credentialUrl: 'aws.amazon.com/verify/10293847'
    },
    {
      id: 'cert-2',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta (Coursera)',
      year: '2023',
      credentialUrl: 'coursera.org/verify/professional-cert'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Place Winner - HackTech Collegiate Hackathon',
      issuerOrEvent: 'HackTech National 2024',
      year: '2024',
      description: 'Led a 4-person team to create an accessible campus resource sharing portal within 36 hours among 120 competing teams.'
    },
    {
      id: 'ach-2',
      title: 'Academic Excellence Award & Merit Scholarship',
      issuerOrEvent: 'Faculty of Engineering',
      year: '2022 - 2024',
      description: 'Recognized in top 3% of the department for sustained academic standing over four consecutive semesters.'
    }
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Conversational' }
  ],
  hobbies: [
    'Open Source Contribution',
    'Competitive Programming (LeetCode 250+ solved)',
    'Tech Blogging & Mentoring',
    'Amateur Photography'
  ],
  theme: {
    template: 'modern',
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 'base',
    spacing: 'balanced',
    accentColor: '#4F46E5', // Indigo
    headingStyle: 'bar'
  }
};

export const fresherStudentResume: ResumeData = {
  ...initialBlankResume,
  id: 'resume-student-fresher',
  title: 'Fresher Computer Science Resume',
  personal: {
    fullName: 'Pooja Reddy',
    jobTitle: 'Aspiring Software Developer | Graduate 2025',
    email: 'pooja.reddy@gmail.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    linkedin: 'linkedin.com/in/poojareddy',
    github: 'github.com/poojareddy-dev',
    portfolio: 'poojareddy.me'
  },
  summary: 'Enthusiastic and analytical Computer Science graduate with strong command of Data Structures, Algorithms, and Modern Web Technologies. Seeking an entry-level software engineering role to contribute fresh perspectives, rapid problem-solving skills, and a dedication to quality software development.',
  theme: {
    template: 'student',
    fontFamily: 'Inter',
    fontSize: 'base',
    spacing: 'balanced',
    accentColor: '#059669', // Emerald
    headingStyle: 'titlecase'
  }
};

export const sampleTemplatesList = [
  {
    id: 'modern',
    name: 'Modern',
    badge: 'Popular',
    desc: 'Contemporary layout with sleek accent lines, balanced white space, and bold section headers. Perfect for tech & modern firms.',
    previewColor: '#4F46E5'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    badge: 'Clean',
    desc: 'Pure monochrome elegance with disciplined typographic hierarchy. High focus on content legibility and zero visual distractions.',
    previewColor: '#0F172A'
  },
  {
    id: 'professional',
    name: 'Professional',
    badge: 'Executive',
    desc: 'Classic corporate design with a distinctive header bar, formal borders, and authoritative presentation suitable for finance & enterprise.',
    previewColor: '#1E3A8A'
  },
  {
    id: 'creative',
    name: 'Creative',
    badge: 'Design',
    desc: 'Modern two-column layout with a stylish sidebar for contact details, skills, and languages. Great for UI/UX, product, and creative roles.',
    previewColor: '#7C3AED'
  },
  {
    id: 'student',
    name: 'Student / Fresher',
    badge: 'Recommended',
    desc: 'Optimized specifically for college students and recent graduates. Highlights education, coursework, academic projects, and honors first.',
    previewColor: '#059669'
  },
  {
    id: 'ats',
    name: 'ATS-Friendly',
    badge: 'High Pass Rate',
    desc: 'Strictly linear, single-column machine-readable format. 100% parsed without distortion by all major Applicant Tracking Systems.',
    previewColor: '#334155'
  }
];
