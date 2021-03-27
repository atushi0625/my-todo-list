<template>
  <form>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      placeholder="8文字上入力してください"
      v-model="password"
      :error-messages="passwordErrors"
      :counter="8"
      label="password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="ログインする場合チェック"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn class="mr-4" :disabled="$v.$invalid" @click="login">
      ログイン
    </v-btn>
    <v-btn @click="clear"> clear </v-btn>
    <div class="mt-10 mx-lg-auto text-h5 font-weight-black">
      <p>アカウントをお持ちでない方</p>
      <nuxt-link to="/Register"> 新規登録はこちら </nuxt-link>
    </div>
    <div class="error" v-if="error">{{ error.message }}</div>
  </form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  middleware: ["checkLogin"],

  validations: {
    password: { required, maxLength: maxLength(8) },
    email: { required, email },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    password: "",
    email: "",
    checkbox: false,
    error: "",
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked &&
        errors.push("ログインすることに同意する必要があります");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("パスワードは最大8文字以上入力してください");
      !this.$v.password.required && errors.push("パスワードは入力必須です");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("有効なe-mailである必要があります");
      !this.$v.email.required && errors.push("E-mailは入力必須です");
      return errors;
    },
  },

  methods: {
    // submit() {
    //   this.$v.$touch();
    // },
    clear() {
      this.$v.$reset();
      this.password = "";
      this.email = "";
      this.checkbox = false;
    },
    login() {
      this.$store
        .dispatch("login/login", {
          //actionsはdispatchで実行
          email: this.email, //引数
          password: this.password, //引数
        })
        .then((user) => {
          //ログイン成功時に.thenに記載,ログインと同時に取得
          console.log("成功！", user);
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error);
        });

      this.email = "";
      this.password = "";
      // if (this.$store.getters["login/user"]) {
      //   //user情報が取得できたらHOME画面に移動できる
      //   this.$router.push("/todos");
      // }
    },
    pressed() {
      alert("pressed");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
  
