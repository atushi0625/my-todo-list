export default ({ app, redirect }, inject) => {
  inject('user', async () => { //'userを注入'ページに'user'を返す
  const auth = await app.$auth()　//authの変数にはauth.jsが入っている
       if (!auth) {
         redirect('/login') //ログイン画面に戻される
         return
       } 
   //     else {
   //       const usersSnapShot = await app.$firestore
   //       .collection('users')
   //       .doc(auth.uid)
   //       .get()
  
   //       const user = usersSnapShot.data()
   //       if(!user)return null

   //       return {
   //        uid: auth.uid,
   //        ...user
   //      }

   //     }

      
     })
   }


   //cannot propaty uid of nullのエラー
// authがnullになっていてnull.uidになっていた。
//原因としては６行目からずっと処理が続いいていたからでした。
// なのでreturnで処理を一回止める必要があった。
