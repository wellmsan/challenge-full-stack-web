<template>
  <v-container>
    <v-text-field
      ref="name"
      v-model="student.name"
      counter="50"
      :rules="student.rules.name"
      :error-messages="errorMessages"
      label="Nome Completo"
      placeholder="John Doe"
      required
    ></v-text-field>
    <v-text-field
      ref="email"
      v-model="student.email"
      counter="255"
      :rules="student.rules.email"
      :error-messages="errorMessages"
      label="E-mail para contato"
      placeholder="johndoe@gmail.com"
      required
    ></v-text-field>
    <v-text-field
      ref="academic_record"
      v-model="student.academic_record"
      counter="10"
      :rules="student.rules.academic_record"
      :error-messages="errorMessages"
      label="Registro Acadêmico"
      placeholder="2132154"
      return-masked-value
      mask="##########"
      required
    ></v-text-field>
    <v-text-field
      ref="cpf"
      v-model="student.cpf"
      counter="14"
      :rules="student.rules.cpf"
      :error-messages="errorMessages"
      label="CPF (###.###.###-##)"
      placeholder="012.345.678-90"
      return-masked-value
      mask="###.###.###-##"
      type="number"
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

  created() {
    this.loadForm();
  },

  methods: {
    async loadForm() {
      if (this.id != undefined) {
        const student = await this.getStudentById(this.id);
        this.student = {
          id: student.id,
          name: student.name,
          email: student.email,
          academic_record: student.academic_record,
          cpf: student.cpf,
        };
      }
    },
  },
};
</script>