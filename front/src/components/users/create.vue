<template>
  <templateCreate
    v-on:submit="onSave"
    v-on:reset="onClean"
    v-on:goBack="goBack"
  >
    <formUser ref="form"></formUser>
  </templateCreate>
</template>
<script>
import templateCreate from "../template/create";
import userMixin from "../../mixins/userMixin";
import formUser from "./form";
import bus from "../../config/eventHub";
import md5 from "js-md5";

export default {
  mixins: [userMixin],

  components: {
    formUser,
    templateCreate,
  },

  methods: {
    goBack() {
      this.$router.push("/users");
    },
    onClean() {
      this.resetUser();
    },
    onSave() {
      let loader = this.$loading.show();
      this.user = this.$refs.form.user;
      try {
        this.saveUser({
          name: this.user.nome,
          email: this.user.email,
          pass: md5(this.user.pass),
        });
        bus.$emit("sucess", { message: "Oba! Usuário Cadastrodo." });
      } catch (e) {
        bus.$emit("error", { message: "Ops! " + e.response.data.message });
        console.error(e.message);
      }
      loader.hide();
    },
  },
};
</script>