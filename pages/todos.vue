<template>
  <div app>
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
// import {mapActions} from 'vuex'
export default {
  fetch({ store }) {
    store.dispatch("sample/getTodos"); //awaite
    console.log(1);
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
    // ...mapActions(['deleteTodo'])

    deleteTodo(index) {
      this.$store.dispatch("sample/deleteTodo", this.todos[index].id);
    },
  },
};
</script>

<style>
</style>