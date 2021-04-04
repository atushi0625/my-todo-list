<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="UserName"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      type="password"
      :counter="8"
      :error-messages="passwordErrors"
      label="password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    >
    </v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="登録することに同意します"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn class="mr-4" :disabled="$v.$invalid" @click="register()">
      登録
    </v-btn>
    <v-btn @click="clear"> 入力をクリアする </v-btn>
    <div style="color: red">
      {{ errMsg }}
    </div>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";

import {
  required,
  maxLength,
  email,
  minLength,
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  middleware: ["checkRegister"],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    name: "",
    email: "",
    password: "",
    checkbox: false,
    errMsg: "",
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("入力を続けてください");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("パスワードは8文字以上にしてください");
      !this.$v.password.required && errors.push("パスワードは必須です");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("ニックネームは10文字以内にしてください");
      !this.$v.name.required && errors.push("ニックネームは必須です");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email &&
        errors.push("適切なメールアドレスを入力してください");
      !this.$v.email.required && errors.push("メールアドレスは必須です");
      return errors;
    },
  },

  methods: {
    register() {
      this.$store
        .dispatch("login/register", {
          email: this.email,
          password: this.password,
          name: this.name,
        })
        .then((user) => {
          console.log(user);
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log({ code: error.code, message: error.message });
        });

      this.email = "";
      this.password = "";
      this.name = "";
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
      this.checkbox = false;
    },
  },
};
</script>










