<template>
  <div class="home flex flex-col items-center">
    <p class="my-2 text-lg font-semibold">
      Welcome to the front app
    </p>
    <pre>{{ houses }}</pre>
    <HistoricChart :historic-array="historic" label='Température' v-if="historic.length > 0"/>
  </div>
</template>

<script>
import {Api} from '@/api';
import { HistoricChart } from "@/components";

export default {
  name: "Home",
  components: {HistoricChart},
  data() {
    return {
      houses: [],
      historic: [],
    }
  },
  async beforeCreate() {
    const houses = await Api.HousesApi.list();
    const detector = await Api.DetectorsApi.get(1, 'thermo');
    this.historic = detector.historic,
    this.houses = houses;
  }
};
</script>
