// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {collection, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbpSPVoKhYZI4NVd5vlInaWkormssW3PY",
  authDomain: "tech-convo.firebaseapp.com",
  projectId: "tech-convo",
  storageBucket: "tech-convo.appspot.com",
  messagingSenderId: "704835648146",
  appId: "1:704835648146:web:438919a37653125bfb844b",
  measurementId: "G-65SGZJ7TP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);
export const firebaseDB= getFirestore(app);

export const userRef=collection(firebaseDB,"users");
export const meetingsRef=collection(firebaseDB,"meetings");