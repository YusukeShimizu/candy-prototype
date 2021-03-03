// Conveniently import this file anywhere to use db

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Initialize Firebase
firebase.initializeApp({
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
});

export const db = firebase.database();

if (location.hostname === "localhost") {
  db.useEmulator("localhost", 9000);
  firebase.auth().useEmulator("http://localhost:9099");
}
