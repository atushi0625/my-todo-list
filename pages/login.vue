<template>
  <div class="login">
    <h1>ログイン</h1>
    <form class="form" @submit.prevent="pressed">
      <span>メールアドレス</span>
      <label class="label">
        <input
          class="input"
          type="text"
          v-model="email"
          placeholder="email@email"
        />
      </label>
      <span>パスワード</span>
      <label class="label">
        <input
          class="input"
          type="password"
          v-model="password"
          placeholder="password"
        />
      </label>
      <button class="button" type="submit" @click="login">ログイン</button>
      <div class="no_account_link">
        <p>アカウントをお持ちでない方</p>
        <nuxt-link to="/Register"> 新規登録はこちら </nuxt-link>
      </div>
    </form>
    <div class="error" v-if="error">{{ error.message }}</div>
  </div>
</template>

<script>
export default {
  middleware: ["checkLogin"],

  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          //ログイン成功時に.thenに記載,ログインと同時に取得
          console.log("成功！");
        })
        .catch((error) => {
          alert(error);
        });

      this.email = "";
      this.password = "";

      // this.$store.dispatch("login/login", {
      //   //actionsはdispatchで実行
      //   email: this.email, //引数
      //   password: this.password, //引数
      // });
      // this.email = "";
      // this.password = "";
      // if (this.$store.getters["login/user"]) {
      //   //user情報が取得できたらHOME画面に移動できる
      //   this.$router.push("/todos");
    },
    pressed() {
      alert("pressed");
    },
  },
};
</script>

<style lang="scss" scoped>
$color: blue;
.login {
  margin-top: 50px;
  display: flex;
  width: 800px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: $color;

  span {
    margin-left: 10px;
  }

  .no_account_link {
    margin-left: 10px;
  }

  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  input {
    width: 400px;
    padding: 30px;
    margin: 10px;
    font-size: 25px;
  }

  button {
    width: 400px;
    height: 75px;
    font-size: 100%;
    margin: 15px 10px;
  }
  .error {
    color: red;
  }
}
</style>

