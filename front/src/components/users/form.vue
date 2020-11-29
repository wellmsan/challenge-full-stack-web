<template>
  <v-container>
    <v-text-field
      ref="nome"
      v-model="user.name"
      :rules="rules.name"
      :error-messages="errorMessages"
      label="Nome Completo"
      placeholder="John Doe"
      required
    ></v-text-field>
    <v-text-field
      ref="email"
      v-model="user.email"
      :rules="rules.email"
      :error-messages="errorMessages"
      label="E-mail para contato"
      placeholder="johndoe@gmail.com"
      required
    ></v-text-field>
    <v-text-field
      ref="senha"
      v-model="user.pass"
      :rules="rules.pass"
      :error-messages="errorMessages"
      label="Senha"
      placeholder="******"
      type="password"
      required
    ></v-text-field>
  </v-container>
</template>
<script>
import userMixin from "../../mixins/userMixin";
export default {
  mixins: [userMixin],

  props: {
    id: String,
  },

  data: () => ({
    rules: {
      name: [
        (v) => !!v || "Nome é obrigatrio!",
        (v) =>
          (v && v.length >= 10) || "Nome precisa ter mais de 10 caracteres!",
      ],
      email: [
        (v) => !!v || "E-mail é obrigatrio!",
        (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido!",
      ],
      pass: [
        (v) => !!v || "Senha é obrigatrio!",
        (v) =>
          (v && v.length >= 6) || "Senha precisa ter mais de 6 caracteres!",
      ],
    },
  }),

  created() {
    this.loadForm();
  },

  methods: {
    async loadForm() {
      if (this.id != undefined && this.getUser != null) {
        this.user = this.getUser;
      }
    },
  },
};
</script>