import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjiHKk3kS9xIvI5D1KHaaU1Q2vIt0Ithw",
    authDomain: "pharmaguide-a86d8.firebaseapp.com",
    projectId: "pharmaguide-a86d8",
    storageBucket: "pharmaguide-a86d8.appspot.com",
    messagingSenderId: "911039093651",
    appId: "1:911039093651:web:d7cdb2022d9b47b790e666",
    measurementId: "G-JHT18KHJFH",
    recaptchaSiteKey: '6LcsfocmAAAAAAUsoJfbmTLpPI52zFAgVkzqkt', // Add your secret key token here

  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  if (!app?.options || Platform.OS === 'web') {
    throw new Error(
      'This example only works on Android or iOS, and requires a valid Firebase config.'
    );
  }
  //const analytics = getAnalytics(app);


  