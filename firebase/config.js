import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBh9U-1o16rciIDH81dZa_smqXoFICpTb4",
  authDomain: "react-native-socials-7ac73.firebaseapp.com",
  projectId: "react-native-socials-7ac73",
  storageBucket: "react-native-socials-7ac73.appspot.com",
  messagingSenderId: "870837503692",
  appId: "1:870837503692:web:f2c4e7dfe89ff5920e6469"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth();
export { auth, app };