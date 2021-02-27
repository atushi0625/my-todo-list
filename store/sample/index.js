import firebase from '~/plugins/firebase'
import { db , todosRef } from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'


export const state = () => ({
  todos: []
})

export const actions = {
  // 初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)
  }),
  // 追加
  add: firestoreAction((context, { name, detail, date }) => {
    if (name.trim()) {
      todosRef.add({
        name,
        detail,
        date,
        done: false,
      })
    }
  }),
  // 削除
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  // ステータスの更新
  toggle: firestoreAction((context, todo) => {
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  }),
// edit: firestoreAction((context, id)=>{
//   todosRef.doc(id)
// })
}






export const getters = {
  orderdTodos: state => {
    return _.sortBy(state.todos, 'created')
    //state.todosの値をcreatedでソートして返す、orderdTodosという名前でコンポーネントから呼び出す
  }
}