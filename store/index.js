import axios from "axios";

export const state = () => ({
    idToken: null //最初は何も入っていない
  })
  
  export const mutations = {
    updateIdToken(state,idToken) {
        state.idToken = idToken; //idTokenをかえる
       }, 
      }
      
      export const getters = {
          idToken: state => state.idToken
        }
        
        export const actions = {
             login ({ commit } ){
               //post通信
                axios
                .post(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9TDyjtoOeQ_0pt05jEfQ7jEUdGqmtPXc',
                  {
                      email: this.email,
                      password: this.password,
                      returnSecureToken	: true,  //常にturuを返せ
                
                 }
                )
                //thenで成功した場合の処理
                    .then(res=>{
                          commit('updateIdToken', res.data.idToken);
                          console.log(res);
                        });
                       },
                      
                       register ({ commit }, axios){
                          axios
                          .post(
                              'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9TDyjtoOeQ_0pt05jEfQ7jEUdGqmtPXc',
                            {
                                email: this.email,
                                password: this.password,
                                returnSecureToken	: true,  //常にturuを返せ
                        
                              })
                              .then(res=>{
                                    commit('updateIdToken', res.data.idToken);
                                  });
                                }
                             }
                          
                          
                          
                          
                          
                          
                          
                          
//     import firebase from '~/plugins/firebase'
    
    
    
//     export const state = () => ({
//       // 取得情報の格納場所
//       user:{
//     // ユーザー情報を取得したらここに値が入る
//      uid: '',      //ID
//      email: '',       //email
//      login: false,
//   }

// })

// export const getters = {
//   // stateを取得する
//   user: state =>{
//     return state.user
//   }
// }

// export const actions = {
//  login({ dispatch }, payload) {
//   firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
//     .then(user => {   //ログイン成功時に.thenに記載,ログインと同時に取得
//         console.log('成功！')
//         dispatch('checkLogin')  
//       }).catch((error) => {
//         alert(error)
//       })
//  },
//  checkLogin ({ commit }) {    //ログイン情報の取得
//   firebase.auth().onAuthStateChanged(function(user){
//     if(user){
//       //ユーザー情報の取得ができたらcommit
//       commit('getData', {uid: user.uid, email: user.email })
//     }
//   })
//  },
//  register ({ dispatch }, payload) {
//    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
//    .then(user =>{
//      console.log(user)
//      dispatch('checkLogin')
//    }).catch(function (error){
//      console.log({'code':error.code, 'message':error.message})
//    })
//  },
// }

// export const mutations = {
//   getData (state, user) {
//     // ユーザー情報をstate.userに代入
//     state.user = user
//     state.user.email = user.email
//   },
//   checkLogin(state){
//     state.user.login = true
//   }
// }

