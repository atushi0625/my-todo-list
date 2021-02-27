import { defaultFormatUtc } from "moment";

export default async ({ redirect, app })=>{
     const user = await app.$user()
     if(!user){
          redirect('/register')
     }
}