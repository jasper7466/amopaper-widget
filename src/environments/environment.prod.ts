export const environment = {
  production: true,
  isLocalTokenServer: false,
  isStandaloneFrame: false,
  // nopaperBaseUrl: 'https://nopaper-demo.abanking.ru/lk-api/external/api',
  // nopaperBaseUrl: 'https://nopaper-test.abanking.ru/lk-api/external/api',
  getNopaperBaseUrl: (version: 'v1' | 'v2') =>
    `https://np-demo.abanking.ru/partner-api/api/${version}/external/api`,
  nopaperBaseTokenUrl: 'https://nopaper-test.abanking.ru/lk-api/external/api',
  localBaseTokenUrl: 'http://localhost:5200',
  getAmoBaseUrl: (domain: string) => `https://${domain}/api/v4`,
};
