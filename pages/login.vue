<template>
  <div class="login">
    <h1>ログイン</h1>
    <form class="form" @submit.prevent>
      <label class="label">
        <span class="label"> email </span>
        <input class="input" type="text" v-model="email" />
      </label>
      <label class="label">
        <span class="label"> password </span>
        <input class="input" type="password" v-model="password" />
      </label>
      <button class="button" type="submit" @click="login">Login</button>
      <nuxt-link to="/register"> アカウント登録はこちら </nuxt-link>
    </form>
    <nuxt-link to="/register"> アカウント作成はこちら </nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["user"];
      console.log(user);
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login(email, password) {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
      if (this.$store.getters["user"]) {
        this.$router.push("/");
      }
    },
    // this.$store.commit('updateIdToken', {
    //   email: this.email,
    //   password: this.password
    // });
    // this.email = '';
    // this.password = '';
  },
};
</script>

