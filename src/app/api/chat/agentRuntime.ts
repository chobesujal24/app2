import { AgentRuntime, ModelProvider } from '@/libs/agent-runtime';

/**
 * Initializes the agent runtime with the user payload in backend
 * For Puter API, no server-side config is needed as it runs client-side
 */
export const initAgentRuntimeWithUserPayload = (
  provider: string,
  payload: any,
  params: any = {},
) => {
  return AgentRuntime.initializeWithProviderOptions(provider, {
    [provider]: { ...params },
  });
};
