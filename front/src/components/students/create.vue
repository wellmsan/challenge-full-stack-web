<template>
  <templateCreate
    v-on:submit="onSave"
    v-on:reset="onClean"
    v-on:goBack="goBack"
  >
    <formStudent ref="formStudent"></formStudent>
  </templateCreate>
</template>
<script>
import templateCreate from "../template/create";
import studentMixin from "../../mixins/studentMixin";
import formStudent from "./form";

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
      if (this.saveStudent() != null) this.$router.push("/students");
    },
  },
};
</script>