import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { firebaseConfig } from "../config";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore()

const registerUser = ({ email, password }) =>
  auth.createUserWithEmailAndPassword(email, password);

const login = ({ email, password }) => auth.signInWithEmailAndPassword(email, password);

const onUserStateChange = (callbackFn) => auth.onAuthStateChanged(callbackFn);

const logout = () => auth.signOut();

export default {
  registerUser,
  login,
  logout,
  onUserStateChange,
  db
};
