export default({ app }, inject, context )=>{
     inject('auth',()=>{
          const { store } = context
          return new Promise((resolve)=>{ //処理が正常に終了した時にresolveが呼ばれる
               app.$fireAuth.onAuthStateChanged((user)=>{ //ログイン時チェック
    //app.$fireAuthはfirebaseのpluginsのinject('fireAuth', firebase.auth())
    //thisでは呼び出せないのでapp.で呼び出す
    store.commit('setUser', user)
                    resolve(user || null) //resolveは解決するという意味
               })
          })
     })
}
//ログイン中のユーザー取得用のplugin