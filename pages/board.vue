<template>
  <v-container class="todo">
    <v-form ref="form">
      <v-row>
        <v-col cols="12" md="12">
          <TodoDetail></TodoDetail>
        </v-col>
      </v-row>
    </v-form>
    <TodoList name="Todo" :todolist="todolist"></TodoList>
    <TodoList name="Done" :todolist="donelist"></TodoList>
  </v-container>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
import TodoDetail from "@/components/TodoDetail.vue";
export default {
  components: {
    TodoList,
    TodoDetail,
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
};
</script>

<style scoped>
.status.done {
  text-decoration: line-through;
}
</style>