export default async ({ redirect ,app})=>{
     const user = await app.$auth 
     if(!user){
          redirect('/register')
     }
}