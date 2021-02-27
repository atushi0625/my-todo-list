<template>
  <div app>
    <div class="page">
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <!-- todoのcreatedに値がある時だけspanで囲ったtodoの要素を描画 -->
          <span>
            <button @click="remove(todo.id)">×</button>
            <button @click="toggle(todo)">
              {{ labels[todo.list] }}
            </button>
            <input
              type="checkbox"
              :checked="todo.done"
              @change="toggle(todo)"
            />
            <!-- firestote上のデータに基づいてチェックボックスのオンオフを切り替え -->
            <!-- changeで選択肢が変更された時に発火する toggleメソッドを呼び出す -->
            <span :class="{ done: todo.done }">
              <!-- doneの値がtrueだったらdoneクラスが設定される -->
              {{ todo.name }}
              <!-- {{ todo.created.toDate() | dateFilter }} -->
            </span>
          </span>
        </li>
      </ul>
      <!-- <label v-for="(label, i) in options" :key="i">
        <input type="radio" v-model="current" :value="label.value" />{{
          label.label
        }}
      </label> -->
      <form @submit.prevent="add">
        <!-- addTodoを押したときにページがリロードされないようにする -->
        <input v-model="name" type="text" placeholder="Todoを追加" />
        <button type="submit">Todoを追加</button>
      </form>
      <nuxt-link to="/memo">メモ帳</nuxt-link>
      <button @click="logout">ログアウトする</button>
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
      done: false,
      current: -1,
      options: [
        { value: -1, label: "すべて" },
        { value: 0, label: "完了" },
        { value: 1, label: "未完了" },
      ],
    };
  },
  computed: {
    todos() {
      return this.$store.getters["sample/orderdTodos"];
      //  vuexのsample/index.jsからリストを以降
      //storeのstateのsample/index.jsの中のtodos
    },
    user() {
      return this.$store.getters["user"];
    },
    computedTodos() {
      // データcurrentが-1ならすべて
      // それ以外なら current と list が一致するものだけに絞り込む
      // 条件演算子？式1：式２
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.list;
      }, this); //最後にthisをつけないとcurrentが読み込めないとエラーが出る
    },
    labels() {
      return this.options.reduce((a, b) => {
        return Object.assign(a, { [b.value]: b.label });
      }, {});
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
      this.$store.dispatch("sample/add", this.name);

      this.name = "";
    },

    //  Todoの削除
    remove(id) {
      //idはfirestoreのドキュメントid
      this.$store.dispatch("sample/remove", id);
    },
    toggle(todo) {
      this.$store.dispatch("sample/toggle", todo);
    },
    logout() {
      this.$store.dispatch("login/logout").then(() => {
        this.$router.push("/");
      });

      alert("ログアウトしますか？");
    },
  },
};
</script>

<style lang="scss" scoped>
$color: blue;
li > span > span.done {
  text-decoration: line-through;
}
h1 {
  color: $color;
}
</style>