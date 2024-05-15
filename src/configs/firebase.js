import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBdSwgWPkMR1zmiwNHRJ-waRlqhvq8ZAs8",
    authDomain: "blossom-nails.firebaseapp.com",
    projectId: "blossom-nails",
    storageBucket: "blossom-nails.appspot.com",
    messagingSenderId: "654693924661",
    appId: "1:654693924661:web:db193ede4808def3bc567c",
    measurementId: "G-M2CW96M7RX"
};

// Initialize Firebase 
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;