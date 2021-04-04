export default({ app, store },inject )=>{
     inject('auth',()=>{
          return new Promise((resolve)=>{ //処理が正常に終了した時にresolveが呼ばれる
               if(!store.state.user)
               app.$fireAuth.onAuthStateChanged((user)=>{ //ログイン時チェック
                     return resolve(user || null) //resolveは解決するという意味
                    })
          })
     })
}
//     //app.$fireAuthはfirebaseのpluginsのinject('fireAuth', firebase.auth())
//     //thisでは呼び出せないのでapp.で呼び出す
//ログイン中のユーザー取得用のplugin
//現在ユーザーがログイン状態なのかログアウト状態なのかを知るため

// export default ({ route, store, redirect, app},inject)=>{
//      inject('auth',()=>{
//           app.$fireAuth.onAuthStateChanged((user)=>{
//                     if(!user && route.name == '/register'){
//                          redirect('/register')
//                     } 
//             })
//           })


// }

// const middleware = ({ route, store, redirect,app }) => {
//      app.$fireAuth.onAuthStateChanged((user) => {
          
//           store.commit('login/setUser')
//           if (!user && route.name !== 'login'){
//                // ログインしていなければ、 /login へリダイレクトする
//                return redirect('/login')
//           } 
//   })
// }

// export default middleware