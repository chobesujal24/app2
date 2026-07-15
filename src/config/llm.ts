/* eslint-disable sort-keys-fix/sort-keys-fix , typescript-sort-keys/interface */
// LLM config simplified for Puter API — no server-side API keys needed
// Puter handles all model routing client-side via puter.ai.chat()

export const getLLMConfig = () => {
  return {
    // Puter API is the only provider, no env vars needed
  };
};

export const llmEnv = getLLMConfig();
