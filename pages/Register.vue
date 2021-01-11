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
export default {
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>