// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2dWX48CheyzxawjQP-pC2BsBGYazdi24",
  authDomain: "inventory-management-1003e.firebaseapp.com",
  projectId: "inventory-management-1003e",
  storageBucket: "inventory-management-1003e.appspot.com",
  messagingSenderId: "866797511832",
  appId: "1:866797511832:web:fb18057ede6b4e0c251ced",
  measurementId: "G-HRR581TBDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}