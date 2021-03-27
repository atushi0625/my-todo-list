<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-list color="#f4f5fc">
        <!-- 子コンポーネントになるので親であるboard.vueに{{ name }}を渡す -->
        <v-subheader class="font-weight-bold">{{ name }}</v-subheader>
        <v-col v-for="todo in todolist" :key="todo.id" cols="12" class="pt-0">
          <v-card>
            <v-card-title class="headline" pb-0>
              <v-checkbox
                :checked="todo.done"
                color="primary"
                class="ma-0"
                :label="todo.name"
                @change="toggle(todo)"
              ></v-checkbox>
            </v-card-title>
            <v-card-text class="pb-0">{{ todo.detail }}</v-card-text>
            <v-card-actions class="pt-0">
              <v-col cols="10" md="10" class="pl-0">
                <v-btn text>
                  <v-chip color="grey lighten-3" label>
                    <v-avatar left>
                      <v-icon small color="primary">mdi-calendar</v-icon>
                    </v-avatar>
                    {{ todo.date }}
                  </v-chip>
                </v-btn>
              </v-col>
              <v-col cols="14" lg="4">
                <v-btn color="blue" text dark @click="remove(todo.id)">
                  <v-icon>mdi-close-circle-outline</v-icon>
                  削除
                </v-btn>
                <EditFome :id="todo.id" />
                <!-- EditFome.vueコンポーネントからpropsで渡ってきたidを:(bind)させる -->
                <!-- そのidはtodoの中のidですよという意味 -->
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import EditFome from "@/components/EditFome.vue";
export default {
  components: {
    EditFome,
  },
  // data() {
  //   return {
  //     update: false,
  //   };
  // },
  props: {
    //データの受け口
    //オブジェクトでもデータを渡せる
    name: {
      type: String, //型を指定
      default: null, //何も指定されなかった時に代わりのものを指定する
      // required: true //必ずこの属性が必要かどうか決める
    },
    todolist: {
      type: Array, //配列型
      default: null,
    },
  },
  methods: {
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
.theme--light.v-label {
  color: #000;
}
.v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
  margin-bottom: 0px;
}
.v-application--is-ltr .v-list-item__avatar:first-child {
  margin-right: 0;
}
</style>