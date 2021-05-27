<template>
  <div class="home flex flex-col items-center">
    <p class="my-2 text-lg font-semibold">
      Welcome to the front app
    </p>
    <pre>{{this.houses}}</pre>
  </div>
</template>

<script>
import {Api} from '@/api';

export default {
  name: "Home",
  data() {
    houses: []
  },
  async beforeCreate() {
    const houses = await Api.HousesApi.list();
    this.houses = houses;
  }
};
</script>
