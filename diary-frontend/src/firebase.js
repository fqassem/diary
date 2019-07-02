import * as firebaseAPI from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class Firebase {
  constructor() {
    firebaseAPI.initializeApp(firebaseConfig);
    this.auth = firebaseAPI.auth();
  }

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  signUp = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
}

const FirebaseSingleton = new Firebase();
export default FirebaseSingleton;
