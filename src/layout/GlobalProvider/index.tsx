import dynamic from 'next/dynamic';
import { FC, PropsWithChildren } from 'react';

import { getDebugConfig } from '@/config/debug';
import { DEFAULT_FEATURE_FLAGS } from '@/config/featureFlags';
import { ServerConfigStoreProvider } from '@/store/serverConfig';

import AppTheme from './AppTheme';
import Locale from './Locale';
import QueryProvider from './Query';
import StoreInitialization from './StoreInitialization';
import StyleRegistry from './StyleRegistry';

let DebugUI: FC = () => null;

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line unicorn/no-lonely-if
  if (getDebugConfig().DEBUG_MODE) {
    DebugUI = dynamic(() => import('@/features/DebugUI'), { ssr: false }) as FC;
  }
}

const GlobalLayout = ({ children }: PropsWithChildren) => {
  // For static export (Firebase), we use defaults instead of server-side cookies/headers
  const serverConfig = { telemetry: {} };

  return (
    <StyleRegistry>
      <Locale>
        <AppTheme>
          <ServerConfigStoreProvider
            featureFlags={DEFAULT_FEATURE_FLAGS}
            serverConfig={serverConfig}
          >
            <QueryProvider>{children}</QueryProvider>
            <StoreInitialization />
          </ServerConfigStoreProvider>
          <DebugUI />
        </AppTheme>
      </Locale>
    </StyleRegistry>
  );
};

export default GlobalLayout;
