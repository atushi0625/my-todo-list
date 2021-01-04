<template>
    <div>
        <h2>登録</h2>
        <label for="email">EMAIL:</label>
        <input
         id="email"
         type="email"
         v-model="email"
        >
        <br>
        <label for="password">パスワード：</label>
        <input 
        id="password"
        type="password"
        v-model="password"
        >
        <br>
        <button @click="register">送信</button>

    </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
      return{
          email: '',
          password: '',
      }
    },
    methods:{
        register(){
            this.$store.commit('index/updateIdToken', {
              email: this.email,
              password: this.password
            });
            this.email = '';
            this.password = '';
     }
  }
};
</script>