import firebase from '~/plugins/firebase'


export const state = () => ({
      user:{
    // ユーザー情報を取得したらここに値が入る
     uid: '',      //ID
     email: '',       //email
     login: false,
  }

})

export const getters = {
  // stateを取得する
  user: state =>{
    return state.user
  }
}

export const actions = {
 login({ dispatch }, payload) {
  firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(user => {   //ログイン成功時に.thenに記載,ログインと同時に取得
        console.log('成功！')
        dispatch('checkLogin')  
      }).catch((error) => {
        alert(error)
      })
 },
 checkLogin ({ commit }) {    //現在ログインしているユーザ情報の取得
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      //ユーザー情報の取得ができたらcommit
      commit('getData', {uid: user.uid, email: user.email })
    }
  })
 },
 register ({ dispatch }, payload) {
   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
   .then(user =>{
     console.log(user)
     dispatch('checkLogin')
   }).catch(function (error){
     console.log({'code':error.code, 'message':error.message})
   })
 },
 logout () {
  firebase.auth().signOut()
  this.checkLogin = false
 }
}

export const mutations = {

  getData (state, user) {
    // ユーザー情報をstate.userに代入
    state.user = user
    state.user.email = user.email
  },
  checkLogin(state){
    state.user.login = true
  },
}

