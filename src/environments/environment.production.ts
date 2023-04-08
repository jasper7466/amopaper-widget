export const environment = {
  production: true,
  isLocalTokenServer: false,
  isStandaloneFrame: false,
  isAmoDevProxy: false,
  getNopaperBaseUrl: (version: 'v1' | 'v2'): string => {
    const postfix = version === 'v1' ? '/api' : '';
    return `https://nopaper-qa.abanking.ru:10003/partner-api/api/${version}/external${postfix}`;
  },
  nopaperBaseTokenUrl:
    'https://nopaper-qa.abanking.ru:10003/partner-api/api/v2/external',
  localBaseTokenUrl: 'http://localhost:5200',
  getAmoBaseUrl: function (domain: string): string {
    return this.isAmoDevProxy ? '/api/v4' : `https://${domain}/api/v4`;
  },
};
