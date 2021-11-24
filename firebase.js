// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGKJWaGBf0moTzI8WAIrQKiQbc3ipgA6M",
  authDomain: "instaweb-35e0d.firebaseapp.com",
  projectId: "instaweb-35e0d",
  storageBucket: "instaweb-35e0d.appspot.com",
  messagingSenderId: "48600305053",
  appId: "1:48600305053:web:a6f73c46be054364657374"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db =getFirestore();
const storage =getStorage();

export {db,app,storage};