export const environment = {
  production: true,
  nopaperBaseUrl: 'https://nopaper-demo.abanking.ru/lk-api/external/api',
  getAmoBaseUrl: (domain: string) => `https://${domain}/api/v4`,
};
