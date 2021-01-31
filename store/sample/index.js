import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'


const db = firebase.firestore() //データベースはfirebase.firestore
const todosRef = db.collection('todos')//コレクション名はtodos

export const state = () => ({
  todos: [],
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef })=>{
    bindFirestoreRef('todos', todosRef)
  }),
  add: firestoreAction((context, name) => {
    if(name.trim()){ 　　//入力値が空白ではないか確認
      todosRef.add({
        name: name,
        state: 0,
        month: 'month',
        day: 'day',
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp()

        
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  toggle: firestoreAction((context, todo) => {  //todoの完了未完了
    todosRef.doc(todo.id).update({
      done: !todo.done
   })
  }), 
}

export const getters = {
  orderdTodos: state => {
   return _.sortBy(state.todos, 'created')
   //state.todosの値をcreatedでソートして返す、orderdTodosという名前でコンポーネントから呼び出す
  }
}