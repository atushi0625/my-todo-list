import user from "../plugins/user"

export const state = () => ({
  user: {
    // ユーザー情報を取得したらここに値が入る
    uid: '',      //ID
    email: '',       //email
    password: '',
    name: ''
  }

})

export const getters = {
  // stateを取得する
  user(state) {
    return state.user
  },
  //   isAuthenticed (state){
  //        return !!state.user
  //   }
}

export const actions = {
  login({ commit }, { email, password }) {
    this.$fireAuth.signInWithEmailAndPassword(email, password)
    commit('login')
    return
  },
  //  checkLogin (context) {    //現在ログインしているユーザ情報の取得、contextの中にcommitが入っている
  //   firebase.auth().onAuthStateChanged(user=>{
  //     if(user){
  //       //ユーザー情報の取得ができたらcommit
  //       context.commit('getData', {uid: user.uid, email: user.email })
  //     }
  //   })
  //  },
  register({ commit }, { email, password }) {
    this.$fireAuth.createUserWithEmailAndPassword(email, password)
    commit('register')
    return

  },
  createUser({ commit,state }) {
    this.$firestore.collection("users").doc(state.user).set({
      name: state.user.name,
      email: state.user.email,
      password: state.user.password,
    }).then(() => {
      console.log("ドキュメント追加に成功");
      commit('createUser')
    }).catch((error) => {
      console.error("ドキュメント追加中にエラー", error)
    })

  }

}

export const mutations = {

  setUser(state, payload) {
    // ユーザー情報をstate.userに代入
    state.user = payload
  },
  //   checkLogin(state){
  //     state.user.login = true
  //   },
}

