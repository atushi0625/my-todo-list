export default async  ({ redirect, app })=> {
     if (await app.$auth) {
       // ログイン中だったらTOPページに遷移する
       redirect('/')
     }
   }
   
// appとredirectはnuxtのcontextに含まれる