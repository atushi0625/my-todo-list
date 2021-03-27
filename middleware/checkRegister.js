export default async ({ redirect, store })=> {
     if (await store.getters.user) {
       // すでにアカウント作成済の場合はTOPページにリダイレクト
       redirect('/')
     }
   }
   