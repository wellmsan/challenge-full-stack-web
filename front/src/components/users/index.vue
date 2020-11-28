<template>
  <templateList
    :headers="headers"
    :items="dataItems"
    :itemsPerPage="10"
    v-on:loadDataItem="onLoadAll"
    v-on:create="onCreate"
    v-on:edit="onEdit"
    v-on:delete="onDelete"
  />
</template>
<script>
import templateList from "../template/list";
import userMixin from "../../mixins/userMixin";
export default {
  mixins: [userMixin],

  components: {
    templateList,
  },

  data: () => ({
    loading: false,
    headers: [
      {
        text: "Nome",
        align: "start",
        value: "nome",
      },
      { text: "E-mail", sortable: false, value: "email" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    dataItems: [],
  }),

  methods: {
    onLoadAll() {
      this.getUserByFilter({});
      for (const user of this.getAllUsers) {
        this.dataItems.push({
          id: user.id,
          nome: user.name,
          email: user.email,
        });
      }
    },
    onCreate() {
      this.$router.push("users/add");
    },
    onEdit(id) {
      this.$router.push("users/" + id);
    },
    onDelete(id) {
      this.deleteUser(id);
    },
  },
};
</script>
