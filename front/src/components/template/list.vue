<template>
  <v-card>
    <v-card-title>
      <v-icon>mdi-view-list</v-icon> Lista de {{ caption | pluralize(10) }}
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="'Buscar ' + caption"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        dark
        class="mb-2"
        v-bind="attrs"
        @click="onCreate()"
      >
        Novo {{ caption }}
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="onEdit(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
// import bus from "../../config/eventHub";
import generalMixin from "../../mixins/generalMixin";

export default {
  mixins: [generalMixin],
  props: {
    title: String,
    headers: Array,
    items: Array,
    itemsPerPage: Number,
  },

  data: () => ({
    search: "",
  }),

  methods: {
    onCreate() {
      this.$emit("create");
    },
    onEdit(item) {
      this.$emit("edit", item);
    },
    loadDataItems() {
      this.$emit("loadDataItem", this.page, this.perPage);
    },
  },
};
</script>