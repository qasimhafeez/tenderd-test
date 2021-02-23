import firebase from "firebase";
import "firebase/auth";
// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: "AIzaSyCWCVvpUxoyDrAj_YOYM1iGQRD451sgMlc",
  authDomain: "tenderd-se-test.firebaseapp.com",
  projectId: "tenderd-se-test",
  storageBucket: "tenderd-se-test.appspot.com",
  messagingSenderId: "859032361561",
  appId: "1:859032361561:web:ff9faa215ba60ec8eaaf48",
  measurementId: "G-GLRVJX4MF8",
});

export const auth = app.auth();

export default app;
