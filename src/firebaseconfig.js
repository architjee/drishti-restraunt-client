
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB_xE9HzF2o1n6wLkPSDwGjVHHTrQh_Jyc",
  authDomain: "drishti-swanky-client.firebaseapp.com",
  projectId: "drishti-swanky-client",
  storageBucket: "drishti-swanky-client.appspot.com",
  messagingSenderId: "502103273382",
  appId: "1:502103273382:web:63c936a073b47df0aee967"
};

const firebaseapp = initializeApp(firebaseConfig);
export default firebaseapp