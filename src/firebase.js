import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = require('./firebaseConfig.json');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
