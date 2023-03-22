import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD9WvJcjj0VvrMP9ATYDCr5O4teHpKpVNw",
  authDomain: "react-native-socials-ea70a.firebaseapp.com",
  projectId: "react-native-socials-ea70a",
  storageBucket: "react-native-socials-ea70a.appspot.com",
  messagingSenderId: "944455822930",
  appId: "1:944455822930:web:0b39264aab5e7b6993b98b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

