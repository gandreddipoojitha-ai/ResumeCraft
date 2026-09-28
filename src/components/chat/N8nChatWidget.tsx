import React, { useState, useEffect, useRef } from 'react';
import {
  ChatMessage,
  DEFAULT_N8N_WEBHOOK_URL,
  getSavedWebhookUrl,
  saveWebhookUrl,
  n8nChatService
} from '../../services/n8nChatService';
import { ResumeData } from '../../types/resume';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Settings,
  RefreshCw,
  Copy,
  Check,
  Minimize2,
  Maximize2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface N8nChatWidgetProps {
  activeResume?: ResumeData | null;
}

export const N8nChatWidget: React.FC<N8nChatWidgetProps> = ({ activeResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(() => getSavedWebhookUrl());
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [testingConnection, setTestingConnection] = useState(false);
  const [includeContext, setIncludeContext] = useState(true);

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: "👋 Hi! I'm your **ResumeCraft AI Assistant** powered by your **n8n workflow**.\n\nAsk me anything about refining your career summary, formatting project bullet points with the Google XYZ formula, or making your resume ATS-ready!",
        timestamp: Date.now(),
        n8nStatus: 'active',
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-n8n-chat', handleOpen);
    return () => window.removeEventListener('open-n8n-chat', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const message = (textToSend || inputMessage).trim();
    if (!message || loading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: message,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    const resumeContext = includeContext && activeResume ? {
      fullName: activeResume.personal.fullName,
      jobTitle: activeResume.personal.jobTitle,
      summary: activeResume.summary,
      skills: activeResume.skills?.technical,
    } : undefined;

    try {
      const response = await n8nChatService.sendMessage({
        message,
        webhookUrl,
        resumeContext,
      });

      const assistantMessage: ChatMessage = {
        id: 'msg-' + Date.now(),
        sender: 'assistant',
        text: response.reply,
        timestamp: Date.now(),
        n8nStatus: response.status,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-' + Date.now(),
          sender: 'assistant',
          text: `⚠️ Error communicating with n8n: ${err.message || 'Please verify the workflow is active.'}`,
          timestamp: Date.now(),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setTestResult(null);
    try {
      const result = await n8nChatService.testConnection(webhookUrl);
      setTestResult(result);
    } catch (e: any) {
      setTestResult({ success: false, message: e.message || 'Connection failed' });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSaveWebhook = () => {
    saveWebhookUrl(webhookUrl);
    handleTestConnection();
  };

  const handleResetToDefault = () => {
    setWebhookUrl(DEFAULT_N8N_WEBHOOK_URL);
    saveWebhookUrl(DEFAULT_N8N_WEBHOOK_URL);
    setTestResult(null);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'msg-welcome-' + Date.now(),
        sender: 'assistant',
        text: "Conversation cleared. How can I help you improve your resume today?",
        timestamp: Date.now(),
        n8nStatus: 'active',
      }
    ]);
  };

  const quickPrompts = [
    '💡 Review my career summary',
    '🎯 How do I make my resume ATS-friendly?',
    '⚡ Google XYZ bullet point examples',
    '🎓 Fresher resume tips for CS students'
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
          title="Open n8n Resume Assistant"
        >
          {/* Animated online status dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
          </span>

          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-100" />
            <div className="text-left">
              <div className="text-xs font-bold tracking-tight">ResumeCraft AI</div>
              <div className="text-[10px] text-indigo-200 font-medium">n8n Chatbot Connected</div>
            </div>
          </div>
        </button>
      )}

      {/* Floating Chat Box Window */}
      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-bottom-5 ${
            isExpanded
              ? 'w-[92vw] sm:w-[540px] h-[82vh] max-h-[750px]'
              : 'w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/90 flex items-center justify-center text-white shadow-xs border border-white/20">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold tracking-wide">ResumeCraft Assistant</h3>
                  <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                    n8n
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>pooji2008.app.n8n.cloud</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors ${
                  showSettings ? 'text-white bg-white/15' : ''
                }`}
                title="Webhook Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors hidden sm:block"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Webhook Configuration Panel (Collapsible) */}
          {showSettings && (
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 text-xs space-y-2.5 animate-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">n8n Webhook Configuration</span>
                <button
                  onClick={clearChat}
                  className="text-[11px] text-rose-600 hover:underline font-semibold"
                >
                  Clear Messages
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Active Webhook URL:
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="flex-1 px-2.5 py-1 text-[11px] font-mono bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSaveWebhook}
                    className="px-2.5 py-1 text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shrink-0"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={handleTestConnection}
                  disabled={testingConnection}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-indigo-600 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${testingConnection ? 'animate-spin' : ''}`} />
                  <span>Test Connection</span>
                </button>

                <button
                  onClick={handleResetToDefault}
                  className="text-[10px] text-slate-500 hover:underline"
                >
                  Reset to Default
                </button>
              </div>

              {testResult && (
                <div
                  className={`p-2 rounded-lg text-[11px] flex items-start gap-1.5 ${
                    testResult.success
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-tight">{testResult.message}</span>
                </div>
              )}
            </div>
          )}

          {/* Context Sharing Indicator */}
          {activeResume?.personal?.fullName && (
            <div className="px-3.5 py-1.5 bg-indigo-50/70 border-b border-indigo-100 flex items-center justify-between text-[11px] text-indigo-900">
              <span className="truncate">
                Resume Context: <strong>{activeResume.personal.fullName}</strong>
                {activeResume.personal.jobTitle ? ` (${activeResume.personal.jobTitle})` : ''}
              </span>
              <label className="flex items-center gap-1 cursor-pointer shrink-0 ml-2">
                <input
                  type="checkbox"
                  checked={includeContext}
                  onChange={(e) => setIncludeContext(e.target.checked)}
                  className="rounded text-indigo-600 text-xs"
                />
                <span className="text-[10px] text-indigo-700">Sync with bot</span>
              </label>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/40 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed relative ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                        : msg.isError
                        ? 'bg-rose-50 text-rose-800 border border-rose-200 rounded-bl-xs'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed text-xs">
                      {msg.text}
                    </div>

                    {!isUser && (
                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1 font-mono">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          className="hover:text-slate-700 p-0.5 rounded transition-colors flex items-center gap-1"
                          title="Copy message"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200 max-w-[70%] text-slate-500 shadow-2xs">
                <Bot className="w-4 h-4 text-indigo-600 animate-pulse" />
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium ml-1">Thinking with n8n...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div className="p-2 border-t border-slate-200 bg-white overflow-x-auto no-scrollbar flex gap-1.5 shrink-0">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={loading}
                className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg whitespace-nowrap text-slate-700 border border-slate-200/80 transition-colors shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about your resume..."
              disabled={loading}
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2.5 text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 rounded-xl shadow-xs transition-colors shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
