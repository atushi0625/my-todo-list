// export default({ app }, inject )=>{
//      inject('auth',()=>{
//           return new Promise((resolve)=>{ //処理が正常に終了した時にresolveが呼ばれる
//                app.$fireAuth.onAuthStateChanged((auth)=>{ //ログイン時チェック
//                     if(auth){
//                          // store.dispatch(login/login);
//                          redirect('/')
//                     }else if(!auth){
//                          // store.commit(login/deleteLoginUser)
//                          redirect('/login')
//                     }
//                     resolve(auth || null) //resolveは解決するという意味
//                })
//           })
//      })
// }
//     //app.$fireAuthはfirebaseのpluginsのinject('fireAuth', firebase.auth())
//     //thisでは呼び出せないのでapp.で呼び出す
//ログイン中のユーザー取得用のplugin
//現在ユーザーがログイン状態なのかログアウト状態なのかを知るため

export default ({ store, redirect, app},inject)=>{
     if(!store.getters.user == null)

     inject('auth',()=>{
          app.$fireAuth.onAuthStateChanged((user)=>{
               if(user){
                    store.commit(login/setUser);
                    redirect('/')
               }else{
                    store.commit(login/deleteLoginUser)
                    return redirect('/login')
               }
          })
     })


}
     
