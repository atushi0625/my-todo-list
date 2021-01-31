import firebase from "firebase"

const config = {
projectId: process.env.FIREBASE_PROJECT_ID,
apiKey: process.env.FIREBASE_API_KEY
}
// 二重に初期が行われないようにする

if(!firebase.apps.length) {
    firebase.initializeApp(config)
}


if (!firebase.apps.length) {
    firebase.initializeApp({ 
    // apiKey: "AIzaSyA9TDyjtoOeQ_0pt05jEfQ7jEUdGqmtPXc",
    apiKey: process.env.FIREBASE_API_KEY,
    // authDomain: "my-todolist-pj.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID,
    // storageBucket: "my-todolist-pj.appspot.com",
    // messagingSenderId: "1007418618640",
    // appId: "1:1007418618640:web:6b344819514c9fd3942b95",
    // measurementId: "G-K0EE1PKRH4"
})
}

// 他の場所から利用できるようにする
export default firebase