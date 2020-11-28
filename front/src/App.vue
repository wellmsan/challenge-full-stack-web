<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <!-- LOGO -->
      <v-img
        :src="require('./assets/logo.png')"
        max-width="400"
        v-if="drawer"
      ></v-img>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item link to="/students">
          <v-list-item-icon>
            <v-icon>mdi-school</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Alunos</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/users">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Usuários</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img
        :src="require('./assets/logo-a.png')"
        max-width="20"
        v-if="!drawer"
      ></v-img>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: true,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = true;
    },
  },
};
</script>
