// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const configString = import.meta.env.VITE_FIREBASE_CONFIG_JSON as string;
const firebaseConfig = JSON.parse(configString);

// Initialize Firebase
initializeApp(firebaseConfig);
export const messaging = getMessaging();
