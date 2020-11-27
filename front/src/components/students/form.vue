<template>
  <v-container>
    <v-text-field
      name="student.nome"
      v-model="student.nome"
      :rules="student.rules.nome"
      :error-messages="errorMessages"
      label="Nome Completo"
      placeholder="John Doe"
      required
    ></v-text-field>
    <v-text-field
      name="email"
      v-model="student.email"
      :rules="student.rules.email"
      :error-messages="errorMessages"
      label="E-mail para contato"
      placeholder="johndoe@gmail.com"
      required
    ></v-text-field>
    <v-text-field
      name="registroAcademico"
      v-model="student.registroAcademico"
      :rules="student.rules.registroAcademico"
      :error-messages="errorMessages"
      label="Registro Acadêmico"
      placeholder="2132154"
      required
    ></v-text-field>
    <v-text-field
      name="cpf"
      v-model="student.cpf"
      :rules="student.rules.cpf"
      :error-messages="errorMessages"
      label="CPF (Cadastro de Pessoa Física)"
      placeholder="012.345.678-90"
      required
    ></v-text-field>
  </v-container>
</template>
<script>
import studentMixin from "../../mixins/studentMixin";
export default {
  mixins: [studentMixin],
  data: () => ({}),
};
</script>