// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOj_WY3ikTxraJ00i_YchOuLrRXTgE9K0",
  authDomain: "cinlok-chat-app.firebaseapp.com",
  projectId: "cinlok-chat-app",
  storageBucket: "cinlok-chat-app.appspot.com",
  messagingSenderId: "535625721148",
  appId: "1:535625721148:web:ac8f019594eb05b552aa39"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
