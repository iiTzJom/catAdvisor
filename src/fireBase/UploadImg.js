import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6aR17VLa7XKmmoz1ouBSWr9T3o9zTvoI",
  authDomain: "dbcatadvisor.firebaseapp.com",
  databaseURL:
    "https://dbcatadvisor-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dbcatadvisor",
  storageBucket: "dbcatadvisor.appspot.com",
  messagingSenderId: "143024102536",
  appId: "1:143024102536:web:037120a60d85248472933d",
  measurementId: "G-L5013J5JTT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imgDB = getStorage(app);
