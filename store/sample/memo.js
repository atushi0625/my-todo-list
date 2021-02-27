// import { firestoreAction } from 'vuexfire/dist/packages/vuexfire/src'
// import firebase from '~/plugins/firebase'

// const db = firebase.firestore()
// const memoRef = db.collection('memo')


export const state = () => ({
     memo: [],
     page: 0,
 })
 
export const actions = {

    addMemo({ commit }, memo){
        console.log(memo)
        memoRef
        .add({
            memo: memo.memo,
        })
        .then((docRef)=>{
            console.log("Document written with ID: ", docRef.id);
            commit('addMemo', memo)
        })
        .catch((error)=>{
            console.log("Error adding document: ", error);
        });
    },

  fetchMemo({ commit }) {
        commit('clearMemo')
        memoRef
        .get()
        .then(res => {
            res.forEach((doc) => { //返ってきたデータをdocとしつつ
               console.log('success : ' + `${doc.id}=> ${doc.data()}`);
               commit('addMemo', doc.data())
            })
        })
        .catch(error => {
            console.log('error : ' + error)
        })
    },
    remove(context, id){
      memoRef.doc(id).delete();
    }
}

export const mutations = {
    addMemo(state, memo){
        state.memo.push(memo)
        console.log(memo,state.memo)
    },
    clearMemo(state){
     state.memo = []
    },


 
     insert(state, obj) {
         const d = new Date();
         const fmt = d.getFullYear() + '-' + (d.getMonth() + 1)
             + '-' + d.getDate() + ' ' + d.getHours() + ':'
             + d.getMinutes();
         state.memo.unshift({
             title: obj.title,
             content: obj.content,
             created: fmt
         });
     },
     
     set_page(state, p) {
         state.page = p;
     },
    //  remove(state, obj) {
    //      const num = 0;
    //      for (let i = 0; i < state.memo.length; i++) {
    //          const ob = state.memo[i];
    //          if (ob.title == obj.title 
    //                  && ob.content == obj.content
    //                  && ob.created == obj.created){
    //              alert('remove it! --' + ob.title);
    //              state.memo.splice(i, 1);
    //              return num;
    //          }
    //      }
    // }
 }

 export const getters = {
     getMemo(state){
         return state.memo
     }
 }

