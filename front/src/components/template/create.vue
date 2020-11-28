<template>
  <v-card>
    <v-card-title>
      <v-icon>mdi-open-in-new</v-icon> Cadastrar {{ caption }}
      <v-spacer></v-spacer>
      <v-btn icon @click="goBack()">
        <v-icon>mdi-arrow-left-bold</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-alert type="error" v-if="showAlert">
        {{ alertMessage }}
      </v-alert>
      <v-form ref="form" v-model="valid" lazy-validation>
        <slot></slot>
      </v-form>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-btn color="primary" @click="submit">
        <v-icon>mdi-content-save</v-icon> Salvar
      </v-btn>
      <v-btn @click="reset"> <v-icon>mdi-cancel</v-icon> Cancelar </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import generalMixin from "../../mixins/generalMixin";

export default {
  mixins: [generalMixin],

  methods: {
    goBack() {
      this.$emit("goBack");
    },
    submit(event) {
      if (this.$refs.form.validate()) {
        event.preventDefault();
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