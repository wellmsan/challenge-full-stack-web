<template>
  <v-container>
    <v-text-field
      ref="nome"
      v-model="user.name"
      :rules="user.rules.name"
      :error-messages="errorMessages"
      label="Nome Completo"
      placeholder="John Doe"
      required
    ></v-text-field>
    <v-text-field
      ref="email"
      v-model="user.email"
      :rules="user.rules.email"
      :error-messages="errorMessages"
      label="E-mail para contato"
      placeholder="johndoe@gmail.com"
      required
    ></v-text-field>
    <v-text-field
      ref="senha"
      v-model="user.pass"
      :rules="user.rules.pass"
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

  data: () => ({}),

  created() {
    if (this.id != undefined) this.getUserById(this.id);
  },
};
</script>