export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: number;
  isError?: boolean;
  n8nStatus?: 'active' | 'inactive_hint' | 'fallback';
}

export const DEFAULT_N8N_WEBHOOK_URL = 'https://pooji2008.app.n8n.cloud/webhook/c7259331-2aa8-4a0a-918c-13c2933825e6/chat';
const STORAGE_WEBHOOK_KEY = 'resumecraft_n8n_webhook_url';
const STORAGE_SESSION_KEY = 'resumecraft_n8n_session_id';

export function getSavedWebhookUrl(): string {
  try {
    return localStorage.getItem(STORAGE_WEBHOOK_KEY) || DEFAULT_N8N_WEBHOOK_URL;
  } catch {
    return DEFAULT_N8N_WEBHOOK_URL;
  }
}

export function saveWebhookUrl(url: string): void {
  try {
    localStorage.setItem(STORAGE_WEBHOOK_KEY, url.trim());
  } catch (e) {
    console.error('Failed to save webhook URL:', e);
  }
}

export function getOrCreateSessionId(): string {
  try {
    let sid = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!sid) {
      sid = 'rc-session-' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem(STORAGE_SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return 'rc-session-default';
  }
}

export const n8nChatService = {
  async sendMessage(params: {
    message: string;
    webhookUrl?: string;
    resumeContext?: {
      fullName?: string;
      jobTitle?: string;
      summary?: string;
      skills?: string[];
    };
  }): Promise<{ reply: string; status: 'active' | 'inactive_hint' | 'fallback' }> {
    const webhookUrl = params.webhookUrl || getSavedWebhookUrl();
    const sessionId = getOrCreateSessionId();

    try {
      const res = await fetch('/api/n8n/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: params.message,
          chatInput: params.message,
          sessionId,
          webhookUrl,
          resumeContext: params.resumeContext,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      return {
        reply: data.reply || 'I received your request through n8n.',
        status: data.status || 'active',
      };
    } catch (err: any) {
      console.warn('Backend n8n proxy failed, trying direct webhook call:', err);
      
      // Fallback: try direct fetch to n8n webhook in case server is running standalone or static
      try {
        const directRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'sendMessage',
            chatInput: params.message,
            message: params.message,
            sessionId,
          }),
        });

        const directData = await directRes.json();
        const replyText = directData.output || directData.text || directData.response || directData.message || JSON.stringify(directData);
        return {
          reply: typeof replyText === 'string' ? replyText : JSON.stringify(replyText),
          status: 'active',
        };
      } catch (directErr: any) {
        return {
          reply: `I could not connect to your n8n workflow at ${webhookUrl}. Please ensure your workflow in n8n is toggled to "Active" in the top-right corner of the editor.`,
          status: 'inactive_hint',
        };
      }
    }
  },

  async testConnection(webhookUrl: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/n8n/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'ping',
          chatInput: 'ping',
          sessionId: 'test-ping',
          webhookUrl,
          isPing: true,
        }),
      });
      const data = await res.json();
      if (data.status === 'inactive_hint') {
        return {
          success: false,
          message: 'Webhook reached, but workflow is currently inactive in n8n. Toggle the Active switch to ON in your n8n canvas.',
        };
      }
      return {
        success: true,
        message: 'Successfully reached n8n webhook!',
      };
    } catch (e: any) {
      return {
        success: false,
        message: e.message || 'Failed to connect to n8n webhook.',
      };
    }
  }
};
