import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyA-GJwcuAlgGX85lF9wuCoxWZ1WYu8xlLw",
    authDomain: "wirvsvirus-19373.firebaseapp.com",
    databaseURL: "https://wirvsvirus-19373.firebaseio.com",
    projectId: "wirvsvirus-19373",
    storageBucket: "wirvsvirus-19373.appspot.com",
    messagingSenderId: "466419990592",
    appId: "1:466419990592:web:45e558854b370e1f97dfa5",
    measurementId: "G-KW9PSHTH71"
};

export const db = firebase
    .initializeApp(config)
    .firestore();
