import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyC69_9HA5MMXCZbe7aq8LKBPqohP5mLeJg",
    authDomain: "linkedin-b233b.firebaseapp.com",
    databaseURL: "https://linkedin-b233b-default-rtdb.firebaseio.com",
    projectId: "linkedin-b233b",
    storageBucket: "linkedin-b233b.appspot.com",
    messagingSenderId: "587539870470",
    appId: "1:587539870470:web:0ac63177d52db9002be487"
};

const fireDB = firebase.initializeApp(firebaseConfig);
// var fireDB = firebase;
export default fireDB;