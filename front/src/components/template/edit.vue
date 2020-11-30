<template>
  <v-card>
    <v-card-title>
      <v-icon>mdi-clipboard-edit</v-icon> Editar {{ caption }}
      <v-spacer></v-spacer>
      <v-btn icon @click="goBack()">
        <v-icon>mdi-arrow-left-bold</v-icon>
      </v-btn>
    </v-card-title>
    <v-form @submit.prevent lazy-validation>
      <slot></slot>
    </v-form>
    <v-card-actions class="pt-0">
      <v-btn color="primary" @click="submit">
        <v-icon>mdi-content-save</v-icon> Atualizar
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
    submit() {
      this.$emit("submit");
    },
    reset() {
      this.$emit("reset");
    },
  },
};
</script>