export default({ app }, inject )=>{
     inject('auth',()=>{
          return new Promise((resolve)=>{ //処理が正常に終了した時にresolveが呼ばれる
               app.$fireAuth.onAuthStateChanged((auth)=>{ //ログイン時チェック
                    resolve(auth || null) //resolveは解決するという意味
               })
          })
     })
}