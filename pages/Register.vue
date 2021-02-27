<template>
  <div class="page">
    <h2 class="text">アカウント登録</h2>
    <form class="form" @submit.prevent>
      <label class="label">
        <span class="label"> email </span>
        <input class="input" type="text" v-model="email" />
      </label>
      <label class="label">
        <span class="iabel"> password </span>
        <input class="input" type="password" v-model="password" />
      </label>
      <button class="button" type="submit" @click="register">Register</button>
    </form>
    <nuxt-link to="/login" class="link"> ログインはこちら </nuxt-link>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase";
export default {
  middleware: ["checkRegister"],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      this.$fireAuth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          db.collection("users")
            .doc(user.user.uid)
            .set({
              email: (this.email = ""),
            });
          console.log(user);
          alert("成功です！");
          if (!user) this.$router.push("/login");
        })
        .catch(function (error) {
          console.log({ code: error.code, message: error.message });
        });
      this.email = "";
      this.password = "";
    },
  },
};
</script>