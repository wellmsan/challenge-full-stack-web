<template>
  <templateCreate
    v-on:submit="onSave"
    v-on:reset="onClean"
    v-on:goBack="goBack"
  >
    <formUser ref="formUser"></formUser>
  </templateCreate>
</template>
<script>
import templateCreate from "../template/create";
import userMixin from "../../mixins/userMixin";
import formUser from "./form";

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
      if (this.saveUser() != null) this.$router.push("/users");
    },
  },
};
</script>