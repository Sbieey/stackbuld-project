import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyAy_8Hu5EvPJ9LNiK1W3gOHa3QJCwmuB-Q",
    authDomain: "stackbuld-project.firebaseapp.com",
    databaseURL: "https://stackbuld-project-default-rtdb.firebaseio.com",
    projectId: "stackbuld-project",
    storageBucket: "stackbuld-project.appspot.com",
    messagingSenderId: "1067598523116",
    appId: "1:1067598523116:web:3a37f0c95a54a68ce153c9",
    measurementId: "G-6674QH8W2V"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
