export const environment = {
  production: true,
  isLocalTokenServer: false,
  isStandaloneFrame: false,
  // nopaperBaseUrl: 'https://nopaper-demo.abanking.ru/lk-api/external/api',
  // nopaperBaseUrl: 'https://nopaper-test.abanking.ru/lk-api/external/api',
  nopaperBaseUrl: 'https://np-demo.abanking.ru/partner-api/api/v1/external',
  nopaperBaseTokenUrl: 'https://nopaper-test.abanking.ru/lk-api/external/api',
  localBaseTokenUrl: 'http://localhost:5200',
  getAmoBaseUrl: (domain: string) => `https://${domain}/api/v4`,
};
