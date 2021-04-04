export default async function ({ redirect, app }) {
     if (await app.$auth()) {
       // すでにアカウント作成済の場合はTOPページにリダイレクト
       redirect('/')
     }
   }