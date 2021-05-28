<template>
  <v-container>
    <div class="text-h3 mb-5">All rooms :</div>
    <v-card
      class="ma-5 pa-2 d-flex justify-center"
      v-for="room in house.rooms"
      :key="room.id"
      @click="$router.push({ name: 'Detectors', params: { idRoom: room.id } })"
    >
      <v-card-title>{{ room.name }}</v-card-title>
    </v-card>
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
  async beforeCreate() {
    const idHouse = this.$route.params.idHouse;
    const house = await Api.HousesApi.get(idHouse);
    this.house = house;
  },
};
</script>
