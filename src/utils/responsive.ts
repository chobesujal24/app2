import { UAParser } from 'ua-parser-js';

/**
 * check mobile device (compatible with static export / client-side)
 */
export const isMobileDevice = () => {
  if (typeof window !== 'undefined') {
    const device = new UAParser(window.navigator.userAgent || '').getDevice();
    return device.type === 'mobile';
  }
  return false;
};

/**
 * get device info (compatible with static export / client-side)
 */
export const gerServerDeviceInfo = () => {
  if (typeof window !== 'undefined') {
    const parser = new UAParser(window.navigator.userAgent || '');
    return {
      browser: parser.getBrowser().name,
      isMobile: isMobileDevice(),
      os: parser.getOS().name,
    };
  }

  return {
    browser: 'Chrome',
    isMobile: false,
    os: 'Windows',
  };
};
