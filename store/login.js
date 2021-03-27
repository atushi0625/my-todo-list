export const state = () => ({
  user: {
      email: '',
      password: '',
      name: '',
      uid:''

    }

  

  // ユーザー情報を取得したらここに値が入る
})

export const getters = {
  // stateを取得する
  user: state =>  state.user
  //   isAuthenticed (state){
  //        return !!state.user
  //   }
}

export const actions = {
  login(context, { email, password }) {
     this.$fireAuth.signInWithEmailAndPassword(email, password).then((user)=>{
      const userId = { email:email, password:password }
      context.commit("setUser", userId)
      //mutationsの処理を呼び出すときはcommit
      console.log('user', user);

     })

  },
  //  checkLogin (context) {    //現在ログインしているユーザ情報の取得、contextの中にcommitが入っている
  //   firebase.auth().onAuthStateChanged(user=>{
  //     if(user){
  //       //ユーザー情報の取得ができたらcommit
  //       context.commit('getData', {uid: user.uid, email: user.email })
  //     }
  //   })
  //  },
   async register(context, {email, password, name, uid}) {
    this.$fireAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      const userId = {name: name, email:email, password:password, uid: uid}
      context.commit("setUser", userId) 
      //mutationsの処理を呼び出すときはcommit
      console.log('user', result);
      const userData = { 
        // name: result.user.name,
        email: result.user.email,
        // password: '',
        uid: result.user.uid
      }
      console.log(userData) 
      this.$firestore.collection('users').doc(result.user.uid).set(userData)
    }).catch(console.error('取得できませんでした'))

  },
  // async createUser(payload,user) {
  //   const userUid = await user.uid
  //   this.$firestore.collection("users").doc(userUid).set({
  //     name: payload.name,
  //     email: payload.email,
  //     password: payload.password,
  //     uid: payload.uid
  //   }).then(() => {
  //     console.log("ドキュメント追加に成功");
  //   }).catch((error) => {
  //     console.error("ドキュメント追加中にエラー", error)
  //   })

  // },
  deleteLoginUser({ commit }){
    commit('deleteLoginUser')
  },
  logout({ dispatch }){
    this.$fireAuth.signOut().then((res)=>{
      dispatch('deleteLoginUser')
    console.log('成功',res)
    })
  }

}

export const mutations = {

  setUser(state, payload) {//第一引数はstate,第二引数はpayload
    //payloadにcommitしたい値を代入する(コンポーネントかアクションズで)
    // ユーザー情報をstate.userに代入
    state.user = payload
  },
  deleteLoginUser(state){
    state.user = ''
  }
  //   checkLogin(state){
  //     state.user.login = true
  //   },
}

