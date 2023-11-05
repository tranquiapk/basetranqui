// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const {getStorage} =require('firebase/storage')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE,
  messagingSenderId: "51404382971",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-M24E2MN401"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage=getStorage(firebaseApp)
module.exports= {storage}