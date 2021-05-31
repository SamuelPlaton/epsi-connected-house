<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn icon v-show="showPrev" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn
        color="primary"
        elevation="0"
        class="d-flex align-center"
        @click="$router.push('/')"
      >
        <div class="width mr-3">
          <v-img
            contain
            class="img"
            src="../public/img/wifi-connection.png"
          ></v-img>
        </div>
        Mes maisons connectés
      </v-btn>
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

<style scoped>
.img {
  height: 36px;
}
.width {
  width: 36px;
}
</style>
