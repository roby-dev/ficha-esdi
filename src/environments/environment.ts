// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'fichasesdi',
    appId: '1:462903599668:web:04126db4f07f32cbe9a061',
    databaseURL: 'https://fichasesdi-default-rtdb.firebaseio.com',
    storageBucket: 'fichasesdi.appspot.com',
    apiKey: 'AIzaSyDjUMNO-YJkBh6CWtFMCNVXahiBE9wKInM',
    authDomain: 'fichasesdi.firebaseapp.com',
    messagingSenderId: '462903599668',
  },
  locals:{
    '1':'Local comunal "La Joya"',
    '2':'Las Buganvilas',
    '3':'Las Buganvilas II',
    '4':'Residencial Jóvenes Unidos'
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.