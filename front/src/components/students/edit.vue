<template>
  <templateEdit v-on:submit="onUpdate" v-on:reset="onClean">
    <formStudent />
  </templateEdit>
</template>
<script>
import templateEdit from "../template/edit";
import studentMixin from "../../mixins/studentMixin";
import formStudent from "./form";

export default {
  mixins: [studentMixin],

  props: {
    editable: Boolean,
  },

  components: {
    formStudent,
    templateEdit,
  },

  methods: {
    onUpdate() {
      console.log("OnUpdate");
    },
    onClean() {
      this.resetStudent();
      console.log("OnClean");
    },
  },
};
</script>