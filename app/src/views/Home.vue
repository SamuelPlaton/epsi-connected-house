<template>
  <v-container>
    <div class="text-h4 my-5">Mes maisons :</div>
    <div class="d-flex justify-center flex-wrap">
      <v-card
        class="ma-5 pa-2"
        width="300"
        v-for="(house, index) in houses"
        :key="house.id"
        @click="$router.push({ name: 'House', params: { idHouse: house.id } })"
      >
        <v-card-title>
          <v-img contain height="36" src="../../public/img/house.png" />
        </v-card-title>
        <v-card-text class="text-h5 d-flex flex-column d-col justify-center align-center">
          <p>{{ house.name }}</p>
          <p class="text-h6">{{housesCoordinates[index]}} km</p>
        </v-card-text>
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
      housesCoordinates: []
    };
  },
  methods: {
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
      return d;
    },
    deg2rad(deg) {
      return deg * (Math.PI/180)
    }
  },
  async beforeCreate() {
    const houses = await Api.HousesApi.list();
    const detector = await Api.DetectorsApi.get(1, "thermo");
    (this.historic = detector.historic), (this.houses = houses);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
          const housesCoordinates = houses.map((house, index) => {
          const houseCoordinates = house.coordinates.split(';')
          const distance = this.getDistanceFromLatLonInKm
          (data.coords.latitude, data.coords.longitude, houseCoordinates[0], houseCoordinates[1]);
          return distance.toFixed(2);
        })
          this.housesCoordinates = housesCoordinates;
      })
    }

  },
};
</script>
