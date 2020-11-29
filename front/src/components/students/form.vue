<template>
  <v-container>
    <v-text-field
      ref="name"
      v-model="student.name"
      counter="50"
      :rules="rules.name"
      :error-messages="errorMessages"
      label="Nome Completo"
      placeholder="John Doe"
      required
    ></v-text-field>
    <v-text-field
      ref="email"
      v-model="student.email"
      counter="255"
      :rules="rules.email"
      :error-messages="errorMessages"
      label="E-mail para contato"
      placeholder="johndoe@gmail.com"
      required
    ></v-text-field>
    <v-text-field
      ref="academic_record"
      v-model="student.academic_record"
      counter="10"
      :rules="rules.academic_record"
      :error-messages="errorMessages"
      label="Registro Acadêmico"
      placeholder="2132154"
      return-masked-value
      mask="##########"
      :readonly="id != null"
      required
    ></v-text-field>
    <v-text-field
      ref="cpf"
      v-model="student.cpf"
      counter="14"
      :rules="rules.cpf"
      :error-messages="errorMessages"
      label="CPF"
      placeholder="012.345.678-90"
      return-masked-value
      mask="###.###.###-##"
      :readonly="id != null"
      required
    ></v-text-field>
  </v-container>
</template>
<script>
import studentMixin from "@/mixins/studentMixin";

export default {
  mixins: [studentMixin],

  props: {
    id: String,
  },

  data: () => ({
    rules: {
      name: [
        (v) => !!v || "Nome é obigatório!",
        (v) =>
          (v && v.length >= 10) || "Nome precisa ter mais de 10 caracteres!",
        (v) => (v && v.length <= 50) || "O Tamanho máximo é de 50 Caracteres",
      ],
      email: [
        (v) => !!v || "E-mail é obrigatrio!",
        (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido!",
      ],
      academic_record: [
        (v) => !!v || "Registro Acadêmico é obrigatrio!",
        (v) => (v && v.length <= 10) || "O Tamanho máximo é de 10 Caracteres",
      ],
      cpf: [
        (v) => !!v || "CPF é obrigatrio!",
        (v) => (v && v.length == 14) || "O Tamanho é de 14 Caracteres",
      ],
    },
  }),

  created() {
    this.loadForm();
  },

  methods: {
    async loadForm() {
      if (this.id != undefined && this.getStudent != null) {
        this.student = this.getStudent;
      }
    },
  },
};
</script>