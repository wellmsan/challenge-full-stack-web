<template>
  <templateCreate
    v-on:submit="onSave"
    v-on:reset="onClean"
    v-on:goBack="goBack"
  >
    <formStudent ref="form"></formStudent>
  </templateCreate>
</template>
<script>
import templateCreate from "../template/create";
import studentMixin from "../../mixins/studentMixin";
import formStudent from "./form";
import bus from "../../config/eventHub";

export default {
  mixins: [studentMixin],

  components: {
    formStudent,
    templateCreate,
  },

  methods: {
    goBack() {
      this.$router.push("/students");
    },
    onClean() {
      this.resetStudent();
    },
    onSave() {
      let loader = this.$loading.show();
      this.student = this.$refs.form.student;
      try {
        this.saveStudent({
          nome: this.student.nome,
          email: this.student.email,
          registroAcademico: this.student.registroAcademico,
          cpf: this.student.cpf,
        });
        bus.$emit("sucess", { message: "Oba! Aluno Cadastrodo." });
      } catch (e) {
        bus.$emit("error", { message: "Ops! " + e.response.data.message });
        console.error(e.message);
      }
      loader.hide();
    },
  },
};
</script>