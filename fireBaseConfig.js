import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBKuUXqCLgUjxvkuTJSXHcT8xSEJBXZCPI",
  authDomain: "todolist-64e50.firebaseapp.com",
  projectId: "todolist-64e50",
  storageBucket: "todolist-64e50.appspot.com",
  messagingSenderId: "955545493274",
  appId: "1:955545493274:web:45134fc3a30f43ef6996a3",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const db = getFirestore(app);
