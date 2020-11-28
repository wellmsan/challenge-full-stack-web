<template>
  <templateEdit
    v-on:submit="onUpdate"
    v-on:reset="onClean"
    v-on:goBack="goBack"
  >
    <formUser ref="formUser" :id="getId" />
  </templateEdit>
</template>
<script>
import templateEdit from "../template/edit";
import userMixin from "../../mixins/userMixin";
import formUser from "./form";

export default {
  mixins: [userMixin],

  components: {
    formUser,
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
      this.$router.push("/users");
    },
    onClean() {
      this.resetUser();
    },
    onUpdate() {
      if (this.updateUser() != null) this.$router.push("/users");
    },
  },
};
</script>