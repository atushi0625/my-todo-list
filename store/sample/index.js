import firebase from '@/plugins/firebase'
// firebaseを定義する


export const state = () => ({
    todos: [],
   })
   
   export const getters = {
    todos: state => {
      return state.todos
    },
   }

   export const actions = {
       
    getTodos({ commit }) {
        firebase.firestore().collection('todos').orderBy("todo").get()  //firebaseからget()でデータを取得
          .then((res) => {
            const todos = []  //取得データを入れる用に作ります
            res.forEach(x => {  //firebaseのdoc.idを取得(collectionの直下)
              console.log(x.data())  //x.data＝xの中のdata{ id: "", todo: ""}をtodosにpushします！
              todos.push(x.data())
            })
            commit('getTodos', todos)   //データが入ったtodosを引数としてcommit
          })
      },
      addTodo({ dispatch }, todo) {
          firebase.firestore().collection('todos').add({})
        //   firebaseのfirestoreの中のコレクションtodosにリストを追加
            .then((res) => {
                firebase.firestore().collection('todos').doc(res.id)
                .set({
                    todo: todo,
                    id: res.id,
                }).then(() => {
                    dispatch('getTodos')
                    console.log(todo, res.id)
                })
            })
      },
      deleteTodo({ commit, dispatch }, id) {
        firebase.firestore().collection('todos').doc(id).delete()
        dispatch('getTodos')
      },
   }

   export const mutations = {
       getTodos (state, todos){
           state.todos = todos  //Todoの追加
       },
       deleteTodo(state, index) {
         state.todos.splice(index,1)  //削除
       },
   }


