<template>
  <div app>
    <div class="page">
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <!-- todoのcreatedに値がある時だけspanで囲ったtodoの要素を描画 -->
          <span v-if="todo.created">
            <button @click="remove(todo.id)">×</button>
            <input
              type="checkbox"
              :checked="todo.done"
              @change="toggle(todo)"
            />
            <!-- firestote上のデータに基づいてチェックボックスのオンオフを切り替え -->
            <!-- changeで選択肢が変更された時に発火する toggleメソッドを呼び出す -->
            <span :class="{ done: todo.done }">
              <!-- doneの値がtrueだったらdoneクラスが設定される -->
              {{ todo.name }} {{ todo.created.toDate() | dateFilter }}
              {{ todo.month }}月{{ todo.day }}日
            </span>
          </span>
        </li>
      </ul>
      <form @submit.prevent="add">
        <!-- addTodoを押したときにページがリロードされないようにする -->
        <input v-model="name" type="text" placeholder="Todoを追加" />
        <!-- <input type="date" name="date" v-model="date" value="date" /> -->
        <select name="month" size="1" v-model="month">
          <option value="" hidden>Month</option>
          <option v-for="month in 12" :key="month" :value="month">
            {{ month }}月
          </option>
        </select>
        <select name="day" size="1" v-model="day">
          <option value="" hidden>Day</option>
          <option v-for="day in 31" :key="day" :value="day">{{ day }}日</option>
        </select>
        <button type="submit">Todoを追加</button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  created() {
    this.$store.dispatch("sample/init");
  },
  data() {
    return {
      name: "",
      month: "",
      day: "",
      done: false,
    };
  },
  computed: {
    todos() {
      // return this.$store.state.sample.todos;
      return this.$store.getters["sample/orderdTodos"];
      //  vuexのsample/index.jsからリストを以降
      //storeのstateのsample/index.jsの中のtodos
    },
    user() {
      return this.$store.getters["user"];
    },
  },
  filters: {
    dateFilter(date) {
      return moment(date).format("YYYY/MM/DD HH:mm:ss");
    },
  },
  methods: {
    //  ボタンを押したらTodoを追加
    add() {
      this.$store.dispatch("sample/add", this.name, this.month, this.day);

      this.name = "";
      this.month = "";
      this.day = "";
    },

    //  Todoの削除
    remove(id) {
      //idはfirestoreのドキュメントid
      this.$store.dispatch("sample/remove", id);
    },
    toggle(todo) {
      this.$store.dispatch("sample/toggle", todo);
    },
  },
};
</script>

<style>
li > span > span.done {
  text-decoration: line-through;
}
</style>