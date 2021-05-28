<template>
  <v-container>
    <div class="text-h3 my-5">My houses :</div>
    <div class="d-flex justify-center">
      <v-card
        class="ma-5 pa-2 "
        width="300"
        v-for="house in houses"
        :key="house.id"
        @click="$router.push({ name: 'House', params: { idHouse: house.id } })"
      >
        <v-card-title>
          <v-img contain height="36" src="../../public/img/house.png" />
        </v-card-title>
        <v-card-text class="text-h5 d-flex justify-center">{{
          house.name
        }}</v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { Api } from "@/api";
import { HistoricChart } from "@/components";
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
