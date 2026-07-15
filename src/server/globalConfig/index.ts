import { PuterProviderCard } from '@/config/modelProviders';
import { GlobalServerConfig } from '@/types/serverConfig';

/**
 * For static export (Firebase Hosting), server config is minimal.
 * Puter API handles everything client-side — no server-side env vars needed.
 */
export const getServerGlobalConfig = (): GlobalServerConfig => {
  const config: GlobalServerConfig = {
    defaultAgent: {
      config: {},
    },
    enableUploadFileToServer: false,
    enabledAccessCode: false,
    enabledOAuthSSO: false,
    languageModel: {
      puter: {
        enabled: true,
      },
    },
    oAuthSSOProviders: [],
    telemetry: {},
  };

  return config;
};

export const getServerDefaultAgentConfig = () => ({});
