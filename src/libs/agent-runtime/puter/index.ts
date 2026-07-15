import { LobeRuntimeAI } from '../BaseAI';
import { ChatCompetitionOptions, ChatStreamPayload, ModelProvider } from '../types';
import { AgentRuntimeError } from '../error';
import { ChatErrorType } from '@/types/fetch';

// Type declarations for Puter global
declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (
          prompt: string | Array<{ role: string; content: string }>,
          options?: {
            model?: string;
            stream?: boolean;
          },
        ) => Promise<any>;
        listModels: () => Promise<any[]>;
      };
    };
  }
}

/**
 * LobePuterAI - Client-side AI runtime using Puter API
 *
 * Puter's AI Gateway provides access to 500+ models from major providers
 * through a single, unified client-side API. No API keys are needed —
 * users authenticate with their Puter account (User-Pays model).
 *
 * @see https://docs.puter.com/tutorials/free-ai-chat/
 */
export class LobePuterAI implements LobeRuntimeAI {
  baseURL?: string;

  constructor(_options?: any) {
    // Puter API is loaded via script tag, no initialization needed
  }

  async chat(payload: ChatStreamPayload, options?: ChatCompetitionOptions): Promise<Response> {
    try {
      // Ensure Puter SDK is available
      if (typeof window === 'undefined' || !window.puter?.ai) {
        throw AgentRuntimeError.chat({
          error: {
            message: 'Puter SDK not loaded. Please ensure the Puter.js script is included in the page.',
            type: 'PuterSDKNotLoaded',
          },
          errorType: ChatErrorType.ProviderBizError,
          provider: ModelProvider.Puter,
        });
      }

      const { messages, model, temperature, top_p, max_tokens } = payload;

      // Convert messages to Puter format
      const puterMessages = messages.map((msg) => ({
        role: msg.role as string,
        content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content),
      }));

      // Check if streaming is supported
      if (payload.stream !== false) {
        // Use streaming mode
        const stream = await window.puter.ai.chat(puterMessages, {
          model: model,
          stream: true,
        });

        // Create a ReadableStream that converts Puter's stream to SSE format
        const readableStream = new ReadableStream({
          async start(controller) {
            const encoder = new TextEncoder();
            try {
              if (stream && typeof stream[Symbol.asyncIterator] === 'function') {
                for await (const chunk of stream) {
                  const text = chunk?.text || chunk?.message?.content || '';
                  if (text) {
                    const sseData = {
                      choices: [
                        {
                          delta: { content: text },
                          index: 0,
                        },
                      ],
                      id: `puter-${Date.now()}`,
                      model: model,
                      object: 'chat.completion.chunk',
                    };
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(sseData)}\n\n`));
                  }
                }
              } else {
                // Fallback: treat as non-streaming response
                const text =
                  typeof stream === 'string'
                    ? stream
                    : stream?.message?.content || stream?.text || JSON.stringify(stream);
                const sseData = {
                  choices: [
                    {
                      delta: { content: text },
                      index: 0,
                    },
                  ],
                  id: `puter-${Date.now()}`,
                  model: model,
                  object: 'chat.completion.chunk',
                };
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(sseData)}\n\n`));
              }
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              controller.close();
            } catch (error) {
              controller.error(error);
            }
          },
        });

        return new Response(readableStream, {
          headers: {
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream',
          },
        });
      }

      // Non-streaming mode
      const response = await window.puter.ai.chat(puterMessages, {
        model: model,
      });

      const text =
        typeof response === 'string'
          ? response
          : response?.message?.content || response?.text || JSON.stringify(response);

      const result = {
        choices: [
          {
            finish_reason: 'stop',
            index: 0,
            message: {
              content: text,
              role: 'assistant',
            },
          },
        ],
        id: `puter-${Date.now()}`,
        model: model,
        object: 'chat.completion',
      };

      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      const err = error as any;
      if (err?.errorType) throw error;

      throw AgentRuntimeError.chat({
        error: {
          message: err?.message || 'Unknown Puter API error',
          type: err?.name || 'PuterAPIError',
        },
        errorType: ChatErrorType.ProviderBizError,
        provider: ModelProvider.Puter,
      });
    }
  }
}
