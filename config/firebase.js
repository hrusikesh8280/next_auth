import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDuV1HDf3qceDF0yKbByKWBuCqxPdJLvnw",
  authDomain: "next-authentication-657af.firebaseapp.com",
  projectId: "next-authentication-657af",
  storageBucket: "next-authentication-657af.appspot.com",
  messagingSenderId: "593574659263",
  appId: "1:593574659263:web:cafa5b6063c9b89427f20a",
  measurementId: "G-LFPC5TV9C4" 
};


const app = initializeApp(firebaseConfig);

let analytics; // Define the analytics variable

if (typeof window !== 'undefined') {
  
  const { getAnalytics } = require('firebase/analytics'); 
  analytics = getAnalytics(app); 
}

export { app, analytics };
