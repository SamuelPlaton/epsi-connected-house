<template>
  <v-container>
    <div class="text-h3 mb-5">All detectors of room {{ room.room.name }} :</div>
    <div
      class="text-h5"
      v-for="(detector, name) in room.detectors"
      :key="detector.id"
    >
      {{ getDetectorsName(name) }} :
      <v-card
        class="ma-5 pa-2 d-flex justify-center"
        v-for="(item, index) in detector"
        :key="item.id"
      >
        <v-card-title>{{ getDetectorName(name) }} #{{ index }}</v-card-title>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { Api } from "@/api";

export default {
  name: "Detectors",
  data() {
    return {
      room: {},
    };
  },
  async beforeCreate() {
    const idRoom = this.$route.params.idRoom;
    const room = await Api.RoomsApi.get(idRoom);
    this.room = room;
  },
  methods: {
    getDetectorsName(detector) {
      return detector.replace("_", " ");
    },
    getDetectorName(detector) {
      const name = detector.replace("_", " ");
      return name.slice(0, -1);
    },
  },
};
</script>
