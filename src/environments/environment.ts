// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
