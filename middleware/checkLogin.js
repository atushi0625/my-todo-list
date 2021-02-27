export default async ({ redirect, app })=>{
     if(await app.$auth()){
          //ログイン中ならTOPページに遷移する
          redirect('/')
     }
}

// appとredirectはnuxtのcontextに含まれる