<template>
  <div class="container">
    <nuxt-link to="/memo">メモ帳</nuxt-link>
    <nuxt-link to="/login">ログイン</nuxt-link>
    <nuxt-link to="/register">登録</nuxt-link>
    <nuxt-link to="/todos">TODO</nuxt-link>
    <nuxt-link to="/board">TODOLIST</nuxt-link>
  </div>
</template>

<script>
export default {
  middleware: ["checkAuth"],
};
</script>