 import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCWNhoYDAmIx0w50vgFhxcLltRLPPb1a9k",
  authDomain: "th-sem-fab71.firebaseapp.com",
  projectId: "th-sem-fab71",
  storageBucket: "th-sem-fab71.appspot.com",
  messagingSenderId: "875655822363",
  appId: "1:875655822363:web:03e6a0fd40a3edea770cbe",
  measurementId: "G-C0540FQVEG"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export default auth;

 