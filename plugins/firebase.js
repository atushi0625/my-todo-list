import firebase from "firebase"
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/analytics'

const config = {
projectId: process.env.FIREBASE_PROJECT_ID,
apiKey: process.env.FIREBASE_API_KEY
}
// 二重に初期が行われないようにする

if(!firebase.apps.length) {
    firebase.initializeApp(config)
}
export const db = firebase.firestore()
export const todosRef = db.collection('todos')
 


if (!firebase.apps.length) {
    firebase.initializeApp({ 
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
})
}
// 他の場所から利用できるようにする
//今回firebaseで使用する機能をvueインスタンスのコンテキストに注入。

export default ({ app }, inject)=>{
    inject('firebase',firebase)
    inject('firestore',firebase.firestore())
    inject('fireAuth',firebase.auth())
    inject('fireStorage',firebase.storage())
}

