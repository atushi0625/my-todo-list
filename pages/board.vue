<template>
  <v-container class="todo">
    <v-form ref="form">
      <v-row>
        <v-col cols="12" md="12">
          <TodoDetail></TodoDetail>
        </v-col>
      </v-row>
    </v-form>
    <h2>{{ number }}</h2>
    <!-- <LikeNumber :total-number="number" @my-click="incrementNumber"></LikeNumber> -->
    <LikeNumber :total-number="number" @my-click="number = $event"></LikeNumber>
    <!-- データの送り口 -->
    <TodoList name="TODO" :todolist="todolist"></TodoList>
    <!-- nameもpropsで渡ってきている　TodoList.vueからpropsで渡ってきたtodolistとboard.vueのtodolistをbindさせる  -->
    <TodoList name="DONE" :todolist="donelist"></TodoList>
    <!-- nameもpropsで渡ってきている　TodoList.vueからpropsで渡ってきたtodolistとboard.vueのdonelistをbindさせる  -->
    <v-btn class="mx-1 my-2 px-3 py-2 red" @click="logout"> LOGOUT </v-btn>
  </v-container>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
import TodoDetail from "@/components/TodoDetail.vue";
import LikeNumber from "@/components/LikeNumber.vue";
export default {
  data() {
    return {
      number: 14, //親コンポーネントのnumber
    };
  },
  components: {
    TodoList,
    TodoDetail,
    LikeNumber,
  },
  computed: {
    todolist() {
      return this.$store.getters["sample/orderdTodos"].filter((el) => {
        return el.done === false;
      }, this);
    },
    donelist() {
      return this.$store.getters["sample/orderdTodos"].filter((el) => {
        return el.done === true;
      }, this);
    },
  },
  created() {
    this.$store.dispatch("sample/init");
  },
  methods: {
    logout() {
      this.$fireAuth.signOut().then((res) => {
        //ログアウト正常終了時はログイン画面に戻る
        this.$router.push("/login");
      });
    },
    // incrementNumber(value) {
    //   this.number = value; //このvalueは子コンポーネントのthis.totalNumber + 1 を受け取った
    // },
  },
};
</script>

<style scoped>
.status.done {
  text-decoration: line-through;
}
</style>
$emit
emitは渡しているけど変えてるわけではない
親のイベントを発火させる起動スイッチ、子コンポーネントの中で親コンポーネントのメソッドを好きなタイミングで発火できる
好きにイベント名を作れる
子のコンポーネントに送り口、親に受け口をおく
$eventが受け取れるデータを示す
親が持ってるnumberは子供から変えてるわけではない、親自身で変えている
親は子供のデータに依存して変わるものはない
子供は親のデータを勝手に変えれない、親が子供のデータに依存して変えれるデータを持っていない
親から子のデータの受け渡しはprops、子供から親へのデータの受け渡しはemit
命名規則
$emitでつけた第一引数はケバブケースで統一




