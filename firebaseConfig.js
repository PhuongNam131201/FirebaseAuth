// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLDZ1CpUr2qsAJzrSAX7xjIrjeUp0m-sQ",
    authDomain: "fir-auth-87ed6.firebaseapp.com",
    projectId: "fir-auth-87ed6",
    storageBucket: "fir-auth-87ed6.appspot.com",
    messagingSenderId: "551898123595",
    appId: "1:551898123595:web:022a0a39768eb7446facce"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);
export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
