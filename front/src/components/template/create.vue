<template>
  <v-form ref="form" @submit.prevent lazy-validation>
    <v-card>
      <v-card-title>
        <v-icon>mdi-open-in-new</v-icon> Cadastrar {{ caption }}
        <v-spacer></v-spacer>
        <v-btn icon @click="goBack()">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-alert :type="alertType" v-if="showAlert">
          {{ alertMessage }}
        </v-alert>
        <slot></slot>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn color="primary" @click="submit">
          <v-icon>mdi-content-save</v-icon> Salvar
        </v-btn>
        <v-btn @click="reset"> <v-icon>mdi-cancel</v-icon> Cancelar </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import generalMixin from "../../mixins/generalMixin";
import bus from "../../config/eventHub";

export default {
  mixins: [generalMixin],

  props: {
    showAlert: {
      type: Boolean,
      default: false,
    },
    alertType: String,
    alertMessage: String,
  },

  created() {
    let vm = this;
    bus.$on("error", (alert) => {
      vm.alertType = "error";
      vm.alertMessage = alert.message;
    });
    bus.$on("success", (alert) => {
      vm.alertType = "success";
      vm.alertMessage = alert.message;
    });
  },

  methods: {
    goBack() {
      this.$emit("goBack");
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit("submit");
      }
    },
    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.$emit("reset");
    },
  },
};
</script>