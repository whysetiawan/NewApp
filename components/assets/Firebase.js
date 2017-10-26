import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBAZZC2b6rN2k-4j-gtDOSKM7J7UyAMM-w",
    authDomain: "new-app-a5e9b.firebaseapp.com",
    databaseURL: "https://new-app-a5e9b.firebaseio.com",
    projectId: "new-app-a5e9b",
    storageBucket: "new-app-a5e9b.appspot.com",
    messagingSenderId: "259425954719"
  };
 export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
