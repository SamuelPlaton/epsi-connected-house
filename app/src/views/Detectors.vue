<template>
  <v-container>
    <div class="text-h3 my-5">All detectors of room {{ room.room.name }} :</div>
    <div
      class="text-h5 px-16 py-3"
      v-for="(detector, name) in room.detectors"
      :key="detector.id"
    >
      {{ getDetectorsName(name) }} :
      <div class="d-flex justify-center">
        <v-card
          class="ma-5 pa-2"
          width="300"
          v-for="(item, index) in detector"
          :key="item.id"
          @click="
            $router.push({
              name: 'DetectorDetails',
              params: { idDetector: item.id, type: getDetectorType(name) },
            })
          "
        >
          <v-card-title>
            <v-img contain height="36" :src="getImg(name)" />
          </v-card-title>

          <v-card-text class="text-h5 d-flex justify-center"
            >{{ getDetectorName(name) }}
          </v-card-text>
          <v-card-actions class="text-caption d-flex justify-center">{{
            index + 1
          }}</v-card-actions>
        </v-card>
      </div>
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
    getImg(detectorName) {
      var images = require.context("../../public/img/", false, /\.png$/);
      if (
        [
          "sound_detectors",
          "thermo_detectors",
          "movement_detectors",
          "luminosity_detectors",
        ].includes(detectorName)
      ) {
        return images("./" + detectorName + ".png");
      }
      return images("./movement_detectors.png");
    },
    getDetectorsName(detector) {
      return detector.replace("_", " ");
    },
    getDetectorName(detector) {
      const name = detector.replace("_", " ");
      return name.slice(0, -1);
    },
    getDetectorType(detector) {
      const arraySplit = detector.split("_");
      return arraySplit[0];
    },
  },
};
</script>
