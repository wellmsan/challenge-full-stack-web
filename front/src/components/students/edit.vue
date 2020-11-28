<template>
  <templateEdit
    v-on:submit="onUpdate"
    v-on:reset="onClean"
    v-on:goBack="goBack"
  >
    <formStudent :id="getId" />
  </templateEdit>
</template>
<script>
import templateEdit from "../template/edit";
import studentMixin from "../../mixins/studentMixin";
import formStudent from "./form";

export default {
  mixins: [studentMixin],

  components: {
    formStudent,
    templateEdit,
  },

  props: {
    id: String,
  },

  computed: {
    getId() {
      return this.id;
    },
  },

  created() {},

  methods: {
    goBack() {
      this.$router.push("/students");
    },
    onClean() {
      this.resetStudent();
    },
    onUpdate() {
      this.updateStudent();
      this.$router.push("/students");
    },
  },
};
</script>