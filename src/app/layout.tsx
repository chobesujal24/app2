import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

import Analytics from '@/components/Analytics';
import { DEFAULT_LANG } from '@/const/locale';
import AuthProvider from '@/layout/AuthProvider';
import GlobalProvider from '@/layout/GlobalProvider';

const PWAInstall = dynamic(() => import('@/features/PWAInstall'), { ssr: false });

// Firebase is initialized client-side via dynamic import
const FirebaseInit = dynamic(() => import('@/lib/firebase').then(() => () => null), { ssr: false });

type RootLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const RootLayout = ({ children, modal }: RootLayoutProps) => {
  const lang = DEFAULT_LANG;
  const direction = 'ltr';

  return (
    <html dir={direction} lang={lang} suppressHydrationWarning>
      <head>
        <script src="https://js.puter.com/v2/" defer></script>
      </head>
      <body>
        <GlobalProvider>
          <AuthProvider>
            {children}
            {modal}
          </AuthProvider>
          <PWAInstall />
        </GlobalProvider>
        <Analytics />
        <FirebaseInit />
      </body>
    </html>
  );
};

export default RootLayout;

export { generateMetadata } from './metadata';

export const generateViewport = () => {
  return {
    initialScale: 1,
    minimumScale: 1,
    themeColor: [
      { color: '#f8f8f8', media: '(prefers-color-scheme: light)' },
      { color: '#000', media: '(prefers-color-scheme: dark)' },
    ],
    viewportFit: 'cover' as const,
    width: 'device-width',
  };
};
