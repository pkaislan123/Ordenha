// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth, 
    sendPasswordResetEmail, signOut,signInWithEmailAndPassword
} from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyBT_j2CJkyltyp-WzeZtbfqEwzB6F_V5LY",
  authDomain: "tovani-9b7c7.firebaseapp.com",
  databaseURL: "https://tovani-9b7c7-default-rtdb.firebaseio.com",
  projectId: "tovani-9b7c7",
  storageBucket: "tovani-9b7c7.appspot.com",
  messagingSenderId: "443666397096",
  appId: "1:443666397096:web:394f30b40c1ad55aad0f9d",
  measurementId: "G-MFXDQRYY8B"
};




const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = () => {
  signOut(auth);
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {auth,db, logInWithEmailAndPassword,sendPasswordReset,  logout}
