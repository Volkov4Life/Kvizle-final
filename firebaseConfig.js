// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZCfutR91Xu3hfTr38LgC-EJq2Us4zQik", // From "current_key"
  authDomain: "kvizle-c9594.firebaseapp.com", // From "project_id" + ".firebaseapp.com"
  projectId: "kvizle-c9594", // From "project_id"
  storageBucket: "kvizle-c9594.firebasestorage.app", // From "storage_bucket"
  messagingSenderId: "1076624736092", // From "project_number"
  appId: "1:1076624736092:android:fdf99623b8b99484938b99" // From "mobilesdk_app_id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const firestore  = getFirestore(app);
