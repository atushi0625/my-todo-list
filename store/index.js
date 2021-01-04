

export const state = () => ({
  idToken: null
})

export const mutations = {
updateIdToken(state,idToken) {
  state.idToken = idToken;
 }, 
}

export const getters = {
  idToken: state => state.idToken
}

export const actions = {
   login ({ commit }, idToken ){
    axios
    .post(
      '/accounts:signInWithPassword?key=AIzaSyA9TDyjtoOeQ_0pt05jEfQ7jEUdGqmtPXc',
    {
      email: this.email,
      password: this.password,
      returnSecureToken	: true,  //常にturuを返せ

    })
    .then(response=>{
        commit('updateIdToken', idToken);
      });
     },

     register ({ commit }, idToken){
      axios
      .post(
        '/accounts:signUp?key=AIzaSyA9TDyjtoOeQ_0pt05jEfQ7jEUdGqmtPXc',
      {
        email: this.email,
        password: this.password,
        returnSecureToken	: true,  //常にturuを返せ
  
      })
      .then(response=>{
          commit('updateIdToken', idToken);
        });
       }
  
   }

