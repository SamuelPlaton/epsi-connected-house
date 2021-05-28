<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn icon v-show="showPrev" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        My connected house
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    showPrev() {
      if (this.$route.name === "Home") {
        return false;
      }
      return true;
    },
  },
};
</script>
