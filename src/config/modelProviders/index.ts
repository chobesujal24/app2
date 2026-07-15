import { ChatModelCard, ModelProviderCard } from '@/types/llm';

import PuterProvider from './puter';

export const LOBE_DEFAULT_MODEL_LIST: ChatModelCard[] = [
  PuterProvider.chatModels,
].flat();

export const DEFAULT_MODEL_PROVIDER_LIST = [
  PuterProvider,
];

export const filterEnabledModels = (provider: ModelProviderCard) => {
  return provider.chatModels.filter((v) => v.enabled).map((m) => m.id);
};

export const isProviderDisableBroswerRequest = (id: string) => {
  const provider = DEFAULT_MODEL_PROVIDER_LIST.find((v) => v.id === id && v.disableBrowserRequest);
  return !!provider;
};

export { default as PuterProviderCard } from './puter';
