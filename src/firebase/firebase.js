import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCWNhoYDAmIx0w50vgFhxcLltRLPPb1a9k",
  authDomain: "th-sem-fab71.firebaseapp.com",
  projectId: "th-sem-fab71",
  storageBucket: "th-sem-fab71.appspot.com",
  messagingSenderId: "875655822363",
  appId: "1:875655822363:web:03e6a0fd40a3edea770cbe",
  measurementId: "G-C0540FQVEG",
  databaseURL:"https://th-sem-fab71-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export const database=getDatabase(app);
export default auth;

 