// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isLocalTokenServer: true,
  // nopaperBaseUrl: 'https://nopaper-demo.abanking.ru/lk-api/external/api',
  // nopaperBaseUrl: 'https://nopaper-test.abanking.ru/lk-api/external/api',
  nopaperBaseUrl: 'https://np-demo.abanking.ru/partner-api/api/v1/external/api',
  nopaperBaseTokenUrl: 'https://nopaper-test.abanking.ru/lk-api/external/api',
  localBaseTokenUrl: 'http://localhost:5200',
  getAmoBaseUrl: (domain?: string) => '/api/v4',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
