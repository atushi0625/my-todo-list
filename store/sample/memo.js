export const state = () => ({
   memo:[],
   page: 0,

})

export const mutations = {
     insert(state, obj) { //objは送信されたフォームの値をまとめたオブジェクト
          let d = new Date();
          let fmt = d.getFullYear() + '-' + (d.getMonth() + 1)
          + '-' + d.getDate() + ' ' + d.getHours() + ':'
          + d.getMinutes();
          state.memo.unshift({ //配列の一番前に引数の値を追加する
               title: obj.title,
               content: obj.content,
               creted: fmt
          });
     },
     set_page(state, p) {
          state.page = p;
     },
     remove(state, obj) { 
      let num = 0;
      for (let i = 0; i < state.memo.length; i++) {
           const ob = state.memo[i];
           if(ob.title == obj.title
               && ob.content == obj.content
               && ob.created == obj.creted){
                    alert('remove it! --' + ob.title);
                    state.memo.splice(i, 1);
                    return num;
               }
         }
     },
}