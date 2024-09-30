// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// Your web app's Firebase configuration

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);
export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
