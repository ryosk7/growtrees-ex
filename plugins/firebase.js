import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASEURL,
    projectId: FIREBASE_PROJECTID,
    storageBucket: FIREBASE_STORAGEBUCKET,
    messagingSenderId: FIREBASE_MESSAGINGSENDERID
  })
}

const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)
export { db }