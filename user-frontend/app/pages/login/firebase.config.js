// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR5a-vRRPzzbrQndl_Nr4xxhERYOBGwjI",
  authDomain: "focusque-eace3.firebaseapp.com",
  projectId: "focusque-eace3",
  storageBucket: "focusque-eace3.appspot.com",
  messagingSenderId: "912656358835",
  appId: "1:912656358835:web:06dd8f7de0c80bbe287fc6",
  measurementId: "G-Z6T31SF3E9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
// export const analytics = getAnalytics(app);