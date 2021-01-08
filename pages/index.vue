<template>
  <div id="app">
    <nuxt-link to="/comments">掲示板</nuxt-link>
    <nuxt-link to="/login">ログイン</nuxt-link>
    <nuxt-link to="/register">登録</nuxt-link>
    <br /><br />
    <p>{{ user.email }}</p>
    <div class="page">
      <ul>
        <li
          v-for="(todo, index) in todos"
          :key="todo.id"
          @click="deleteTodo(index)"
        >
          <button @click="deleteTodo(index)">×</button>
          {{ todo.todo }}
        </li>
      </ul>
      <form @submit.prevent="addTodo">
        <input v-model="todo" type="text" placeholder="Todoを追加" />
        <button type="submit">Todoを追加</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("sample/getTodos"); //awaiteはpromiseの役割
  },
  data() {
    return {
      todo: "",
    };
  },
  computed: {
    todos() {
      return this.$store.getters["sample/todos"];
      //  vuexのsample/index.jsからリストを以降
    },
    user() {
      return this.$store.getters["user"];
    },
  },
  methods: {
    //  ボタンを押したらTodoを追加
    addTodo() {
      if (this.todo) {
        this.$store.dispatch("sample/addTodo", this.todo);
        //vuexのmutationsから持ってきた
        this.todo = "";
        // thisの後inputを空欄に
      }
    },
    //  Todoの削除
    deleteTodo(index) {
      this.$store.dispatch("sample/deleteTodo", this.todos[index].id);
    },
  },
};
</script>

<style>
</style>