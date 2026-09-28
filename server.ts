import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Helper to call Gemini with fallback
async function callGemini(prompt: string, fallbackContent: string): Promise<string> {
  if (!ai || !apiKey) {
    return fallbackContent;
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });
    const text = response.text;
    return text ? text.trim() : fallbackContent;
  } catch (error) {
    console.warn('Gemini API call failed, using heuristic fallback:', error);
    return fallbackContent;
  }
}

// 1. Enhance Career Summary / Objective
app.post('/api/ai/enhance-summary', async (req: Request, res: Response) => {
  const { currentSummary, field, experienceLevel } = req.body;
  
  const prompt = `You are an expert resume consultant and executive career coach.
Write 3 distinct, high-impact resume professional summaries / career objectives for a candidate.
Field / Target Role: ${field || 'Software Engineering / Tech'}
Experience Level: ${experienceLevel || 'Fresher / Entry-Level / Junior'}
Current Draft: "${currentSummary || 'Eager professional looking to contribute to innovative projects.'}"

Requirements:
- Make each version compelling, ATS-optimized, metric-friendly, and professional.
- Option 1: "Action & Results-Focused" (highlighting quantifiable achievements and forward-looking momentum)
- Option 2: "Modern & Skills-Centric" (highlighting core domain proficiencies, technical breadth, and agile problem solving)
- Option 3: "Leadership & Collaboration" (highlighting cross-functional communication, adaptability, and dedication)
Return ONLY raw JSON with this format:
{
  "options": [
    { "title": "Results-Focused", "text": "..." },
    { "title": "Skills-Centric", "text": "..." },
    { "title": "Collaborative & Driven", "text": "..." }
  ]
}`;

  const defaultFallback = JSON.stringify({
    options: [
      {
        title: "Results-Focused",
        text: `Results-driven ${field || 'technology'} enthusiast with a strong foundation in modern architectures and problem-solving. Proven track record of developing scalable applications and translating business requirements into high-performing digital solutions.`
      },
      {
        title: "Skills-Centric",
        text: `Motivated ${field || 'developer'} possessing rigorous academic and project experience. Skilled at rapid prototyping, clean code standards, and agile collaboration, committed to delivering measurable business impact.`
      },
      {
        title: "Collaborative & Driven",
        text: `Dynamic and detail-oriented graduate passionate about building intuitive user experiences and resilient systems. Adept at collaborative sprint environments, cross-functional communication, and continuous learning.`
      }
    ]
  });

  try {
    const rawResult = await callGemini(prompt, defaultFallback);
    // clean json markdown ticks if present
    const cleaned = rawResult.replace(/^```json/m, '').replace(/```$/m, '').trim();
    const parsed = JSON.parse(cleaned);
    res.json(parsed);
  } catch (e) {
    res.json(JSON.parse(defaultFallback));
  }
});

// 2. Enhance Project Descriptions (Generate Action Bullet Points)
app.post('/api/ai/enhance-project', async (req: Request, res: Response) => {
  const { projectName, technologies, currentDescription } = req.body;

  const prompt = `You are a resume optimizer. Transform this project description into 3 to 4 high-impact resume bullet points using the Google XYZ formula: "Accomplished [X], as measured by [Y], by doing [Z]".
Project Name: ${projectName || 'Web Application'}
Technologies: ${technologies || 'React, TypeScript, Node.js, Tailwind CSS'}
Current Description: "${currentDescription || 'Created a full stack app with authentication and dashboard'}"

Return JSON ONLY:
{
  "bullets": [
    "Architected and deployed...",
    "Engineered interactive UI reducing load times by...",
    "Integrated secure RESTful APIs ensuring..."
  ]
}`;

  const defaultFallback = JSON.stringify({
    bullets: [
      `Architected and deployed a responsive application using ${technologies || 'modern web technologies'}, improving accessibility and user engagement across desktop and mobile devices.`,
      `Engineered reusable component architecture and state management, optimizing render efficiency and reducing client-side load latency by 35%.`,
      `Integrated end-to-end data validation and API endpoints with robust error handling, ensuring seamless user interaction and 99.9% uptime.`
    ]
  });

  try {
    const rawResult = await callGemini(prompt, defaultFallback);
    const cleaned = rawResult.replace(/^```json/m, '').replace(/```$/m, '').trim();
    const parsed = JSON.parse(cleaned);
    res.json(parsed);
  } catch (e) {
    res.json(JSON.parse(defaultFallback));
  }
});

// 3. Suggest Skills by Field/Domain
app.post('/api/ai/suggest-skills', async (req: Request, res: Response) => {
  const { field } = req.body;
  const targetField = field || 'Full Stack Web Development';

  const prompt = `Suggest the top relevant skills for a resume in the field: "${targetField}".
Group them into technical skills and soft skills.
Return JSON ONLY:
{
  "technical": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6", "Skill 7", "Skill 8"],
  "soft": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"]
}`;

  const defaultFallback = JSON.stringify({
    technical: [
      "JavaScript / TypeScript", "React.js", "Node.js", "Tailwind CSS",
      "Git & GitHub", "REST APIs", "SQL & Database Design", "Unit Testing",
      "Agile Methodologies", "Cloud & Docker"
    ],
    soft: [
      "Cross-Functional Communication", "Critical Thinking", "Problem Solving",
      "Time Management", "Adaptability & Teamwork"
    ]
  });

  try {
    const rawResult = await callGemini(prompt, defaultFallback);
    const cleaned = rawResult.replace(/^```json/m, '').replace(/```$/m, '').trim();
    const parsed = JSON.parse(cleaned);
    res.json(parsed);
  } catch (e) {
    res.json(JSON.parse(defaultFallback));
  }
});

// 4. Transform Raw Experience into STAR Bullet Points
app.post('/api/ai/bullet-points', async (req: Request, res: Response) => {
  const { role, company, rawInput } = req.body;

  const prompt = `You are an executive resume writer. Take this raw description of work experience or duties and rewrite it into 3 strong, professional resume bullet points starting with strong action verbs (e.g. Orchestrated, Engineered, Spearheaded, Accelerated).
Role: ${role || 'Intern / Associate'}
Company/Context: ${company || 'Technology Company'}
Raw Notes: "${rawInput || 'Helped fix bugs and made frontend screens and worked with team'}"

Return JSON ONLY:
{
  "bullets": [
    "Spearheaded...",
    "Collaborated with...",
    "Streamlined..."
  ]
}`;

  const defaultFallback = JSON.stringify({
    bullets: [
      `Spearheaded frontend feature development and responsive layout enhancements, resulting in a 25% increase in user retention.`,
      `Collaborated closely with cross-functional engineering and design teams in daily standups to triage and resolve critical software defects.`,
      `Streamlined testing routines and documentation workflows, enhancing code maintainability and team velocity.`
    ]
  });

  try {
    const rawResult = await callGemini(prompt, defaultFallback);
    const cleaned = rawResult.replace(/^```json/m, '').replace(/```$/m, '').trim();
    const parsed = JSON.parse(cleaned);
    res.json(parsed);
  } catch (e) {
    res.json(JSON.parse(defaultFallback));
  }
});

// 5. ATS Resume Scanner and Analyzer
app.post('/api/ai/ats-check', async (req: Request, res: Response) => {
  const { resumeData, targetRole } = req.body;

  const prompt = `You are an advanced Applicant Tracking System (ATS) auditor and hiring manager.
Audit the following resume content for ATS friendliness, section completeness, formatting strengths, keyword richness, readability, and contact clarity.
Target Role / Field: ${targetRole || 'Software Engineering / General Professional'}
Resume Content JSON:
${JSON.stringify(resumeData || {}, null, 2)}

Provide a strict, constructive ATS evaluation.
Return JSON ONLY:
{
  "score": 85,
  "summary": "Overall assessment statement...",
  "breakdown": {
    "contactInfo": { "score": 90, "status": "good", "notes": "..." },
    "sectionCompleteness": { "score": 85, "status": "good", "notes": "..." },
    "keywords": { "score": 75, "status": "needs-improvement", "notes": "..." },
    "readability": { "score": 90, "status": "good", "notes": "..." },
    "quantifiableResults": { "score": 70, "status": "needs-improvement", "notes": "..." }
  },
  "strengths": [
    "Clear educational history with degree and institution",
    "Proper email and LinkedIn contact links provided"
  ],
  "improvements": [
    "Incorporate more quantifiable metrics (% or numbers) in project descriptions",
    "Add more industry-standard keyword acronyms for ATS scanners"
  ],
  "suggestedKeywords": ["TypeScript", "CI/CD", "Agile", "System Design", "Unit Testing", "RESTful APIs"]
}`;

  // Calculate algorithmic baseline score
  let calculatedScore = 65;
  const personal = resumeData?.personal || {};
  if (personal.fullName) calculatedScore += 5;
  if (personal.email) calculatedScore += 5;
  if (personal.phone) calculatedScore += 5;
  if (personal.linkedin || personal.github) calculatedScore += 5;
  if (resumeData?.summary?.length > 40) calculatedScore += 5;
  if (resumeData?.education?.length > 0) calculatedScore += 5;
  if (resumeData?.skills?.technical?.length >= 3) calculatedScore += 5;
  if (resumeData?.projects?.length > 0) calculatedScore += 5;

  const defaultFallback = JSON.stringify({
    score: Math.min(calculatedScore, 92),
    summary: `Your resume demonstrates solid foundational structure with clean contact points and clear educational context. Adding more quantifiable metrics and target keywords will elevate your ATS ranking.`,
    breakdown: {
      contactInfo: {
        score: personal.email && personal.phone ? 95 : 70,
        status: personal.email && personal.phone ? "good" : "needs-improvement",
        notes: personal.email && personal.phone ? "Email, phone, and professional links are well structured." : "Make sure phone and email are fully specified."
      },
      sectionCompleteness: {
        score: resumeData?.education?.length && resumeData?.skills?.technical?.length ? 90 : 70,
        status: "good",
        notes: "Core sections (Education, Skills, Experience/Projects) are accounted for."
      },
      keywords: {
        score: 80,
        status: "good",
        notes: "Solid representation of modern technical proficiencies."
      },
      readability: {
        score: 95,
        status: "good",
        notes: "Layout is clean, free of parsing hurdles, and friendly to parsing bots."
      },
      quantifiableResults: {
        score: 75,
        status: "needs-improvement",
        notes: "Try to inject metrics (e.g. 'improved by 30%', 'scaled to 1,000+ users')."
      }
    },
    strengths: [
      "Standard, machine-readable section headings that ATS systems parse easily",
      "Direct links to GitHub and LinkedIn profiles for automated verification",
      "Clean separation between technical and interpersonal skills"
    ],
    improvements: [
      "Include explicit percentages, timeframes, or user numbers in project bullet points",
      "Tailor summary sentence keywords to match job posting criteria",
      "Ensure all certifications have issuing authority and year listed"
    ],
    suggestedKeywords: [
      "Git & Version Control", "RESTful Architecture", "Performance Optimization",
      "Test-Driven Development", "Cross-Browser Compatibility", "Agile / Scrum"
    ]
  });

  try {
    const rawResult = await callGemini(prompt, defaultFallback);
    const cleaned = rawResult.replace(/^```json/m, '').replace(/```$/m, '').trim();
    const parsed = JSON.parse(cleaned);
    res.json(parsed);
  } catch (e) {
    res.json(JSON.parse(defaultFallback));
  }
});

// 6. Fix Grammar & Tone
app.post('/api/ai/fix-grammar', async (req: Request, res: Response) => {
  const { text, targetTone } = req.body;

  const prompt = `Review and improve the grammar, sentence flow, vocabulary, and conciseness of the following text for a professional resume.
Tone: ${targetTone || 'Professional, active voice, punchy, confident'}
Input: "${text || ''}"

Return JSON ONLY:
{
  "improvedText": "...",
  "changesMade": ["Replaced passive voice with active verbs", "Enhanced clarity and vocabulary"]
}`;

  const defaultFallback = JSON.stringify({
    improvedText: text ? text.replace(/\bwas responsible for\b/gi, 'spearheaded').replace(/\bworked on\b/gi, 'developed and executed') : '',
    changesMade: ["Polished phrasing to emphasize active contribution and ownership."]
  });

  try {
    const rawResult = await callGemini(prompt, defaultFallback);
    const cleaned = rawResult.replace(/^```json/m, '').replace(/```$/m, '').trim();
    const parsed = JSON.parse(cleaned);
    res.json(parsed);
  } catch (e) {
    res.json(JSON.parse(defaultFallback));
  }
});

// 7. n8n Chatbot Webhook Proxy
const DEFAULT_N8N_URL = 'https://pooji2008.app.n8n.cloud/webhook/c7259331-2aa8-4a0a-918c-13c2933825e6/chat';

app.post('/api/n8n/chat', async (req: Request, res: Response) => {
  const { message, chatInput, sessionId, webhookUrl, resumeContext, isPing } = req.body;
  const targetUrl = (webhookUrl || DEFAULT_N8N_URL).trim();
  const textMessage = (message || chatInput || '').trim();

  // If ping only, test connection
  if (isPing) {
    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: 'ping',
          message: 'ping',
          sessionId: sessionId || 'test-ping',
        }),
      });

      const responseText = await response.text();
      if (response.status === 404 && responseText.includes('is not registered')) {
        return res.json({
          status: 'inactive_hint',
          reply: 'Workflow reached, but it is currently inactive in n8n. Toggle the Active switch to ON in your n8n canvas.',
        });
      }
      return res.json({
        status: response.ok ? 'active' : 'fallback',
        reply: `Received HTTP ${response.status}`,
      });
    } catch (err: any) {
      return res.json({ status: 'fallback', reply: err.message });
    }
  }

  // Normal Chat Message
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 18000); // 18s timeout

    const n8nResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ResumeCraft-Bot/1.0',
      },
      signal: controller.signal,
      body: JSON.stringify({
        action: 'sendMessage',
        chatInput: textMessage,
        message: textMessage,
        sessionId: sessionId || 'rc-session-default',
        context: resumeContext || {},
      }),
    });

    clearTimeout(timeoutId);

    const rawBody = await n8nResponse.text();

    // Check if n8n returned 404 (workflow inactive)
    if (n8nResponse.status === 404 && rawBody.includes('is not registered')) {
      // Generate a helpful response via Gemini while explaining the n8n activation state
      const aiPrompt = `You are the ResumeCraft AI assistant. A user asked: "${textMessage}".
Candidate Context (if any): ${JSON.stringify(resumeContext || {})}
Provide an encouraging, clear, and actionable answer about resumes, career tips, or interview preparation.`;

      const aiFallbackAnswer = await callGemini(
        aiPrompt,
        "Here are tips for crafting an outstanding resume: focus on measurable accomplishments (Google XYZ formula), keep your layout clean and ATS-friendly, and ensure contact information is easily accessible."
      );

      return res.json({
        status: 'inactive_hint',
        reply: `⚠️ *Note: Your n8n workflow at pooji2008.app.n8n.cloud is currently Inactive. In your n8n editor, toggle the 'Active' switch in the top-right corner to route directly through your custom n8n nodes.*\n\n${aiFallbackAnswer}`,
      });
    }

    // Try parsing n8n response as JSON
    try {
      const parsed = JSON.parse(rawBody);
      let reply = '';
      if (typeof parsed === 'string') {
        reply = parsed;
      } else if (parsed.output) {
        reply = parsed.output;
      } else if (parsed.text) {
        reply = parsed.text;
      } else if (parsed.response) {
        reply = parsed.response;
      } else if (parsed.message) {
        reply = parsed.message;
      } else if (Array.isArray(parsed) && parsed[0]?.output) {
        reply = parsed[0].output;
      } else {
        reply = rawBody;
      }

      return res.json({
        status: 'active',
        reply,
      });
    } catch {
      return res.json({
        status: 'active',
        reply: rawBody || 'Received response from n8n.',
      });
    }
  } catch (error: any) {
    console.warn('n8n webhook call failed or timed out:', error);

    // Call Gemini as intelligent fallback
    const aiPrompt = `You are ResumeCraft AI. The user asked: "${textMessage}".
Answer in a concise, friendly, and structured manner with bullet points if applicable.`;
    const fallbackAnswer = await callGemini(
      aiPrompt,
      "I'm here to help with your resume questions! Feel free to ask about ATS optimization, formatting, skills, or writing project bullet points."
    );

    return res.json({
      status: 'fallback',
      reply: fallbackAnswer,
    });
  }
});

// Start Server with Vite or Static
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`ResumeCraft server running on port ${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
