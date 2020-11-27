<template>
  <templateList
    :headers="headers"
    :items="users"
    :itemsPerPage="10"
    v-on:create="onCreate()"
    v-on:edit="onEdit(item)"
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
        sortable: false,
        value: "nome",
      },
      { text: "E-mail", value: "email" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    users: [],
  }),

  methods: {
    onCreate() {
      this.$router.push("users/add");
    },
    onEdit(item) {
      this.$router.push("users/" + item.id);
    },
    onDelete() {},
  },
};
</script>
