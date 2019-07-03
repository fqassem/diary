import * as firebaseApp from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
    firebaseApp.initializeApp(firebaseConfig);
    this.auth = firebaseApp.auth();
    this.firestore = firebaseApp.firestore();
  }

  getPostsForCurrentUser = async () => {
    if (this.userPosts) {
      return this.userPosts;
    } else {
      const posts = await this.firestore
        .collection("users")
        .doc(this.auth.currentUser.uid)
        .collection("posts")
        .get();
      const formattedPosts = posts.docs.map(doc => {
        return Object.assign({}, doc.data(), { id: doc.id });
      });
      return formattedPosts;
    }
  };

  createPostForCurrentUser = ({ title, content }) =>
    this.firestore
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .collection("posts")
      .add({
        title,
        content,
        datePublished: firebaseApp.firestore.FieldValue.serverTimestamp()
      });

  getAllPostsForUser = async () => {
    const currentPosts = await this.getPostsForCurrentUser();
    currentPosts.get().then(querySnapshot => {
      const allPosts = querySnapshot.docs.map(doc => {
        return Object.assign({}, doc.data(), { id: doc.id });
      });
      return allPosts;
    });
  };

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  signUp = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
}

const FirebaseSingleton = new Firebase();
export default FirebaseSingleton;
