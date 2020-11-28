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
    <v-alert :type="alertType" v-if="showAlert">
      {{ alertMessage }}
    </v-alert>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="onEdit(item.id)">
          mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" @click="onDelete(item.id, item.nome)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="showModalDelete" persistent max-width="350">
      <v-card>
        <v-card-title class="headline"
          ><v-icon>mdi-trash-can-outline</v-icon>
          <b>Excluir {{ caption }}</b></v-card-title
        >
        <v-card-text
          >Deseja realmente excluir
          <b>{{ selectedItem.description }}</b></v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" flat @click="showModalDelete = false"
            >Cancelar</v-btn
          >
          <v-btn color="red darken-1" flat @click="confirmDelete"
            >Excluir</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
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
    showModalDelete: false,
    selectedItem: {
      id: null,
      description: "",
    },
  }),

  created() {
    this.loadDataItems();
  },

  methods: {
    loadDataItems() {
      this.$emit("loadDataItem");
    },
    onCreate() {
      this.$emit("create");
    },
    onEdit(id) {
      this.$emit("edit", id);
    },
    onDelete(id, nome) {
      this.selectedItem = {
        id: id,
        description: nome,
      };
      this.showModalDelete = true;
    },
    confirmDelete() {
      this.showModalDelete = false;
      this.$emit("delete", this.selectedItem.id);
    },
  },
};
</script>