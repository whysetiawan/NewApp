import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDU_CZvyDZ48yUl25RxshFuT6T1f07R0N4",
    authDomain: "whysetiawan-43f13.firebaseapp.com",
    databaseURL: "https://whysetiawan-43f13.firebaseio.com",
    projectId: "whysetiawan-43f13",
    storageBucket: "whysetiawan-43f13.appspot.com",
    messagingSenderId: "751741051001"
  };
 export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
