<template>
  <v-container>
    <div class="text-h4 my-5">Mes pièces :</div>
    <div class="d-flex justify-center flex-wrap">
      <v-card
        class="ma-5 pa-2"
        width="300"
        v-for="room in house.rooms"
        :key="room.id"
        @click="
          $router.push({ name: 'Detectors', params: { idRoom: room.id } })
        "
      >
        <v-card-title
          ><v-img contain height="36" :src="getImg(room.name)"
        /></v-card-title>
        <v-card-text class="text-h5 d-flex justify-center">{{
          room.name
        }}</v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { Api } from "@/api";
export default {
  name: "House",
  data() {
    return {
      house: {},
    };
  },
  methods: {
    getImg(roomName) {
      var images = require.context("../../public/img/", false, /\.png$/);
      if (["Salon", "Cuisine", "Salle de bain", "Chambre"].includes(roomName)) {
        return images("./" + roomName + ".png");
      }
      return images("./Chambre.png");
    },
  },
  async beforeCreate() {
    const idHouse = this.$route.params.idHouse;
    const house = await Api.HousesApi.get(idHouse);
    this.house = house;
  },
};
</script>
