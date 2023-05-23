import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCE4kOgOg_1AvJFxKibNZQt-zGHoyH-3rs",
  authDomain: "rs-project-e53cf.firebaseapp.com",
  projectId: "rs-project-e53cf",
  storageBucket: "rs-project-e53cf.appspot.com",
  messagingSenderId: "692845946969",
  appId: "1:692845946969:web:df21f7f45744491507a948",
};
//rconsole.log(firebase.apps.length === 0)
const app = initializeApp(firebaseConfig);
//export const fireStore = app.fireStore();
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app)
export {auth,db,storage}