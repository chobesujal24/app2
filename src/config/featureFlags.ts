/**
 * Feature flags configuration for Qyvera AI
 * Controls which features are enabled/disabled
 */

export interface IFeatureFlags {
  isAgentEditable: boolean;
  language_model_settings: boolean;
  openAIApiKey: boolean;
  openAIProxyUrl: boolean;
  webrtc_sync: boolean;
  check_updates: boolean;
  welcome_suggest: boolean;
  clerk_sign_up: boolean;
  market_page: boolean;
  edit_agent_setting: boolean;
}

export const DEFAULT_FEATURE_FLAGS: IFeatureFlags = {
  isAgentEditable: true,
  language_model_settings: true,
  openAIApiKey: false,
  openAIProxyUrl: false,
  webrtc_sync: false,
  check_updates: false,
  welcome_suggest: true,
  clerk_sign_up: false,
  market_page: true,
  edit_agent_setting: true,
};

/**
 * Maps feature flag environment variables to state
 * For static export (Puter/Firebase), all flags use defaults
 */
export const mapFeatureFlagsEnvToState = (flags: Partial<IFeatureFlags>): IFeatureFlags => ({
  ...DEFAULT_FEATURE_FLAGS,
  ...flags,
});

/**
 * Server-side feature flags value (for static export, just returns defaults)
 */
export const getServerFeatureFlagsValue = (): Partial<IFeatureFlags> => DEFAULT_FEATURE_FLAGS;

/**
 * Direct access to server feature flags (for page components)
 */
export const serverFeatureFlags = () => DEFAULT_FEATURE_FLAGS;
