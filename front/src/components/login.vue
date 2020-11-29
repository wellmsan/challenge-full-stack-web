<template>
  <v-app>
    <v-main>
      <v-layout justify-center>
        <v-flex xs3 id="login">
          <v-img :src="require('../assets/logo.png')" max-width="400"></v-img>
          <v-toolbar color="black">
            <v-toolbar-title class="white--text"> LOGIN </v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-form v-model="valid" ref="form" @submit.prevent lazy-validation>
              <v-container>
                <v-alert :type="alertType" v-if="showAlert">
                  {{ alertMessage }}
                </v-alert>
                <v-text-field
                  ref="username"
                  v-model="login.username"
                  :rules="login.rules.username"
                  :error-messages="errorMessages"
                  label="E-mail"
                  placeholder="john@doe.com"
                  required
                ></v-text-field>
                <v-text-field
                  ref="password"
                  v-model="login.password"
                  :rules="login.rules.password"
                  type="password"
                  :error-messages="errorMessages"
                  label="Senha"
                  placeholder="******"
                  required
                ></v-text-field>
              </v-container>
            </v-form>
            <v-card-actions class="pt-0">
              <v-btn color="primary" @click="validate">
                <v-icon>mdi-content-save</v-icon> Entrar
              </v-btn>
              <v-btn @click="reset">
                <v-icon>mdi-cancel</v-icon> Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-main>
  </v-app>
</template>
<script>
import loginMixin from "../mixins/loginMixin";
export default {
  name: "login",

  mixins: [loginMixin],

  data: () => ({
    //
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.onLogin();
      }
    },
    reset() {
      this.$refs.form.reset();
      this.showAlert = false;
    },
  },
};
</script>
<style scoped>
#login {
  margin-top: 40px;
}
</style>