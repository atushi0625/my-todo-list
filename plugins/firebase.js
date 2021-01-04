import firebase from "firebase"

// firebaseに初期化に必要なパラメーターをオブジェクト形式で用意
// const config = {
//     projectId: process.env.FIREBASE_PROJECT_ID
// }

// 二重に初期が行われないようにする
if (!firebase.apps.length) {
    firebase.initializeApp({
    apiKey: "AIzaSyA9TDyjtoOeQ_0pt05jEfQ7jEUdGqmtPXc",
    authDomain: "my-todolist-pj.firebaseapp.com",
    projectId: "my-todolist-pj",
    storageBucket: "my-todolist-pj.appspot.com",
    messagingSenderId: "1007418618640",
    appId: "1:1007418618640:web:6b344819514c9fd3942b95",
    measurementId: "G-K0EE1PKRH4"
})
}

// 他の場所から利用できるようにする
export default firebase