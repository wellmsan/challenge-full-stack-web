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
        value: "academic_record",
      },
      { text: "Nome", value: "name" },
      { text: "E-mail", value: "email" },
      { text: "CPF", value: "cpf" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    dataItems: [],
  }),

  methods: {
    onLoadAll() {
      this.getStudentByFilter({});
      for (const student of this.getAllStudents) {
        this.dataItems.push({
          id: student.id,
          name: student.name,
          email: student.email,
          cpf: student.cpf,
          academic_record: student.academic_record,
        });
      }
    },
    onCreate() {
      this.$router.push("students/add");
    },
    onEdit(id) {
      this.$router.push("students/" + id);
    },
    onDelete(id) {
      this.deleteStudent(id);
    },
  },
};
</script>