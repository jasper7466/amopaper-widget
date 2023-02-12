export const environment = {
  production: true,
  isLocalTokenServer: false,
  // nopaperBaseUrl: 'https://nopaper-demo.abanking.ru/lk-api/external/api',
  nopaperBaseUrl: 'https://nopaper-test.abanking.ru/lk-api/external/api',
  nopaperBaseTokenUrl: 'https://nopaper-test.abanking.ru/lk-api/external/api',
  localBaseTokenUrl: 'http://localhost:5200',
  getAmoBaseUrl: (domain: string) => `https://${domain}/api/v4`,
};
