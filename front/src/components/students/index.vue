<template>
  <templateList
    :headers="headers"
    :items="students"
    :itemsPerPage="10"
    v-on:create="onCreate()"
    v-on:edit="onEdit(item)"
  />
</template>
<script>
import templateList from "../template/list";
import studentMixin from "../../mixins/studentMixin";
export default {
  mixins: [studentMixin],

  components: {
    templateList,
  },

  data: () => ({
    loading: false,
    headers: [
      {
        text: "Registro Acadêmico",
        align: "start",
        sortable: false,
        value: "registroAcademico",
      },
      { text: "Nome", value: "nome" },
      { text: "E-mail", value: "email" },
      { text: "CPF", value: "cpf" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    students: [],
  }),

  methods: {
    onCreate() {
      this.$router.push("students/add");
    },
    onEdit(item) {
      this.$router.push("students/" + item.id);
    },
    onDelete() {},
  },
};
</script>