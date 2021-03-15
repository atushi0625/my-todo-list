import firebase from '~/plugins/firebase'
import firestore from 'firebase/app'
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
   add: firestoreAction(async(context, { name, detail, date }) => { //分割代入で{}の中に引数を入れる
    const docID = await todosRef.doc().id　
    //この処理はawaitで待って最後にドキュメントIDを取得してfirestoreのフィールドに追加
    if (name.trim()) { //trimで先頭と最後の空白がカットされる
      todosRef.doc(docID).set({//上処理作られたdocIDをフィールドにset
      //setではなくaddにしてしまうとドキュメントIDとコレクションのフィールドに追加されるIDが異なってしまう
        //分割代入で省略して記述できる
        name, //name:name
        detail, //detail:detail
        date, //detile:date
        done: false,
        id:docID //予約番号ドキュメントID
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
  //編集機能
  update: firestoreAction((context,{ name, detail, date, id } )=>{
    todosRef.doc(id).update({
      name,
      detail,
      date
    },{merge:true})
  })
}






export const getters = {
  orderdTodos: state => {
    return _.sortBy(state.todos, 'created')
    //state.todosの値をcreatedでソートして返す、orderdTodosという名前でコンポーネントから呼び出す
  },

}