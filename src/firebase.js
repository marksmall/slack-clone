// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAtsbAsjav5EsCHzFpdHofgCmI2J-n7Rsg',
  authDomain: 'slack-clone-edd46.firebaseapp.com',
  projectId: 'slack-clone-edd46',
  storageBucket: 'slack-clone-edd46.appspot.com',
  messagingSenderId: '1000154324057',
  appId: '1:1000154324057:web:a8ad08157e452364a1a548',
  measurementId: 'G-9DBXLR02MQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
