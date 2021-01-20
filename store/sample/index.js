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
       
   async getTodos({ commit }) {

  const res = await  firebase.firestore().collection('todos').orderBy("todo").get()
      //firebaseからget()でデータを取得
      
        console.log(0);
        const todos = []  //取得データを入れる用に作ります
        res.forEach(x => {  //firebaseのdoc.idを取得(collectionの直下)
          console.log(x.data())  //x.data＝xの中のdata{ id: "", todo: ""}をtodosにpushします！
          todos.push(x.data())
        })
        commit('getTodos', todos)   //データが入ったtodosを引数としてcommit
      

      },
 async  addTodo({ commit }, todo) {
　　  await  firebase.firestore().collection('todos').add({ 
            todo: todo,
　　　　　　　　　　　})
        //   firebaseのfirestoreの中のコレクションtodosにリストを追加
                    commit('getTodos')
              },
            //idとはfirestoreのドキュメントid
     deleteTodo({ commit }, id) {
        firebase.firestore().collection('todos').doc('id').delete().then(()=>{
            commit('getTodos', id)
          })
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


