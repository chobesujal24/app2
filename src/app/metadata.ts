import { Metadata } from 'next';

const title = 'Qyvera AI';
const description = 'Qyvera AI brings you the best AI chat experience with GPT, Claude, Gemini, Llama, DeepSeek and 500+ more models. Powered by Puter API.';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    appleWebApp: {
      statusBarStyle: 'black-translucent',
      title,
    },
    description,
    icons: {
      apple: '/apple-touch-icon.png?v=1',
      icon: '/favicon.ico?v=1',
      shortcut: '/favicon-32x32.ico?v=1',
    },
    manifest: '/manifest.json',
    metadataBase: new URL('https://qyvera.web.app'),
    openGraph: {
      description,
      images: [
        {
          alt: title,
          height: 640,
          url: '/og/cover.png?v=1',
          width: 1200,
        },
      ],
      locale: 'en-US',
      siteName: title,
      title: title,
      type: 'website',
      url: 'https://qyvera.web.app',
    },
    title: {
      default: title,
      template: '%s · Qyvera AI',
    },
    twitter: {
      card: 'summary_large_image',
      description,
      images: ['/og/cover.png?v=1'],
      site: '@qyvera',
      title,
    },
  };
};
