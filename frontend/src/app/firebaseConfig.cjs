// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvX6SmJ9dw0JzcP5NMEZGrtlVykyezXAI",
    authDomain: "lookstock-c211d.firebaseapp.com",
    projectId: "lookstock-c211d",
    storageBucket: "lookstock-c211d.firebasestorage.app",
    messagingSenderId: "522853621365",
    appId: "1:522853621365:web:ba8bb558321a700eabe23c"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
