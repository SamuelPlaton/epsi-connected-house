<template>
  <v-container>
    <div class="text-h3 mb-5">My houses :</div>
    <v-card
      class="ma-5 pa-2 d-flex justify-center"
      v-for="house in houses"
      :key="house.id"
      @click="$router.push({ name: 'House', params: { idHouse: house.id } })"
    >
      <v-card-title>{{ house.name }}</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import { Api } from "@/api";

export default {
  name: "Home",
  components: { HistoricChart },
  data() {
    return {
      houses: [],
    };
  },
  async beforeCreate() {
    const houses = await Api.HousesApi.list();
    const detector = await Api.DetectorsApi.get(1, "thermo");
    (this.historic = detector.historic), (this.houses = houses);
  },
};
</script>
