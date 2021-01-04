<template>
 <div>
   <h1>My TODO List</h1>
<input type="text" v-model="name"><br>
<label for="comment">コメント：</label>
<textarea v-model="comment"></textarea>
<button @click="createComment">コメントをサーバーに送る</button>
<h2>掲示板</h2>
<div v-for="post in posts" :key='post.name'>
 <div>名前：{{ post.fields.name.stringValue }}</div>
 <div>コメント：{{ post.fields.comment.stringValue }}</div>
</div>
 </div>    
</template>

<script>
import axios from "axios";

export default {
   data(){
      return {
        name: "",
        comment: "",
        posts:[]
      }
   },
   computed:{
     idToken(){
         return this.$store.getters.idToken;
     }
   },
   created(){
     axios
     .get('/comments', {
         headers: {
             Authorization: `Bearer ${this.idToken}`
         }
     })
     .then(response => {
       this.posts = response.data.documents;
     });
    //  データを何も送らないから引数は２つ
   },
   methods:{
     createComment(){
       axios.post('/comments',{
        fields:{
          name:{
            stringValue: this.name
          },
          comment:{
           stringValue: this.comment
          }
         }
       },
       {
         headers: {
             Authorization: `Bearer ${this.idToken}`
         }
       }
     );
       this.name = "";
       this.comment = "";
     }
   }                 
};
</script>

<style>


</style>
