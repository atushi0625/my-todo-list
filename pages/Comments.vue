<template>
  <div class="comment">
    <h1>コメントしてね</h1>
    <label for="name">ニックネーム：</label>
    <input type="text" v-model="name" />
    <br />
    <label for="comment">コメント：</label>
    <textarea v-model="comment"></textarea>
    <br />
    <button @click="createComment">コメントをサーバーに送る</button>
    <h2>コメントリスト</h2>
    <div v-for="post in posts" :key="post.name">
      <br />
      <div>名前：{{ post.fields.name.stringValue }}</div>
      <div>コメント：{{ post.fields.comment.stringValue }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      comment: "",
      posts: [],
    };
  },
  created() {
    axios.get("/comments").then((res) => {
      //非同期処理が終わった後
      this.posts = res.data.documents; //空のpostsに取ってきたデータを表示する
      console.log(res.data.documents);
    });
  },
  methods: {
    createComment() {
      axios
        .post("/comments", {
          fields: {
            //cloudfirestoreの場合
            name: {
              stringValue: this.name, //型を指定する
            },
            comment: {
              stringValue: this.comment, //型を指定する
            },
          },
        })
        .then((res) => {
          console.log(res);
        });
      this.name = "";
      this.comment = "";
    },
  },
};
</script>
