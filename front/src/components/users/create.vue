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
      this.saveUser();
      this.$router.push("/users");
    },
  },
};
</script>