// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4J8aoKGseRqyHdcQB2tJoYoU9TuEDTjw",
  authDomain: "secrettalks-app.firebaseapp.com",
  projectId: "secrettalks-app",
  storageBucket: "secrettalks-app.appspot.com",
  messagingSenderId: "98491441766",
  appId: "1:98491441766:web:a792ccc9ef69bd100383a7",
  measurementId: "G-0YKM5BJRZ6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

