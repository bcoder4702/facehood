import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDEpuwJAEajo39elKlqQri5Yi7k9b31mIc",
  authDomain: "facehoodv1.firebaseapp.com",
  projectId: "facehoodv1",
  storageBucket: "facehoodv1.appspot.com",
  messagingSenderId: "328203175673",
  appId: "1:328203175673:web:df9520effeaf0867618428",
  measurementId: "G-46H3MR6G9S"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
