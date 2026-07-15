import { get } from 'lodash-es';

import { NS } from '@/locales/resources';

// Import all default locale files directly for static export compatibility
import resources from '@/locales/default';

export const translation = async (ns: NS = 'common') => {
  const i18ns = (resources as any)[ns] || {};

  return {
    t: (key: string, options: { [key: string]: string } = {}) => {
      if (!i18ns) return key;
      let content = get(i18ns, key);
      if (!content) return key;
      if (options) {
        Object.entries(options).forEach(([k, value]) => {
          content = content.replace(`{{${k}}}`, value);
        });
      }
      return content;
    },
  };
};
