import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCht6QG3RtrLy9FXuCVCFtew5UFdjwNKwU",
  authDomain: "react-chat-b2f07.firebaseapp.com",
  projectId: "react-chat-b2f07",
  storageBucket: "react-chat-b2f07.appspot.com",
  messagingSenderId: "460416216146",
  appId: "1:460416216146:web:48fa55b53774e0d748c38b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);

