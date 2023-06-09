import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const registerUser = ({ email, password }) =>
  createUserWithEmailAndPassword(auth, email, password);

const login = ({ email, password }) =>
  signInWithEmailAndPassword(auth, email, password);

const onUserStateChange = (callbackFn) => onAuthStateChanged(auth, callbackFn);

const logout = () => signOut(auth);

export default {
  registerUser,
  db,
  login,
  logout,
  onUserStateChange,
};
