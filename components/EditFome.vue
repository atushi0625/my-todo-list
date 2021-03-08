<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on }">
      <v-btn color="red" dark class="font-weight-bold" v-on="on">
        <v-icon small class="mr-2">mdi-plus-circle-outline </v-icon>
        編集
      </v-btn>
    </template>

    <v-card>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="name" label="やること"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="detail" label="備考"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="いつまでにやる"
                    readonly
                    v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <div class="flex-grow-1"></div>
                  <v-btn text color="red" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="red" @click="$refs.dialog.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="dialog = false">キャンセル</v-btn>
        <v-btn color="primary" text @click="editTodo(id)">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  data() {
    return {
      name: "",
      detail: "",
      // date: new Date().toISOString(),//2021-00-00T00:00:00.000Z
      date: new Date().toISOString().substr(0, 10), //0番目から１０番目の文字列だけ表示
      menu: false,
      modal: false,
      dialog: false,
    };
  },
  methods: {
    editTodo(id) {
      this.$store.dispatch("sample/update", {
        name: this.name,
        detail: this.detail,
        date: this.date,
      });
      this.dialog = false;
      this.name = "";
      this.detail = "";
    },
  },
};
</script>

 編集ボタンクリック
 クリックされたIDをプロップスでEDIT.VUEに渡す（親）　　取得
 編集対象のID