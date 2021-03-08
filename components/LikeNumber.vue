<template>
  <div>
    <p>いいね(例){{ halfNumber }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
<script>
export default {
  //   props: ["totalNumber"],//プロパティ名はなんでもいい
  //propsでオブジェクトと配列を渡すときは参照渡しになる
  props: {
    totalNumber: {
      type: Number, //keyに名前、valueに型の種類
      required: true, //必ずこの属性（totalNumber）が必要かどうか
      //何も指定しないと警告が表示される
    },
  },
  computed: {
    halfNumber() {
      return this.totalNumber / 2;
    },
  },
  methods: {
    increment() {
      //データの送り口
      this.$emit("my-click", this.totalNumber + 1);
      //第１引数はイベントの名前（なんでもいい）、第２引数に渡すデータ自身を入れる

      //       this.totalNumber + 1;
      // これでは親の値は変わらない
    },
  },
};
</script>


