export const environment = {
  production: true,
  isLocalTokenServer: false,
  isStandaloneFrame: false,
  // nopaperBaseUrl: 'https://nopaper-demo.abanking.ru/lk-api/external/api',
  // nopaperBaseUrl: 'https://nopaper-test.abanking.ru/lk-api/external/api',
  getNopaperBaseUrl: (version: 'v1' | 'v2') => {
    const postfix = version === 'v1' ? '/api' : '';
    return `https://nopaper-qa.abanking.ru:10003/partner-api/api/${version}/external${postfix}`;
  },
  nopaperBaseTokenUrl:
    'https://nopaper-qa.abanking.ru:10003/partner-api/api/v2/external',
  localBaseTokenUrl: 'http://localhost:5200',
  getAmoBaseUrl: (domain: string) => `https://${domain}/api/v4`,
};
