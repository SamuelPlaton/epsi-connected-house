<template>
  <v-container>
    <div class="flex row align-center justify-lg-space-between">
      <div class="text-h5 my-5">Détecteurs {{ room.room.name }} :</div>
      <v-btn
        color="blue"
        dark
        @click="dialog = true"
      >
        CONSOMMATION DU MOIS
      </v-btn>
    </div>
    <div
      class="text-h6 px-16 py-3"
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

          <v-card-actions class="text-caption d-flex justify-center">{{
              index + 1
            }}
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          Consommation du mois
        </v-card-title>

        <div class="py-5 px-2" v-if="consumption.detectors.length !== 0">
          <HistoricChart :historicArray="consumption.detectors" :label="'Consommation en (kW/h)'" />
          <div class="text-h6 py-5 flex row justify-end">
            Total du mois : <strong>{{ consumption.consumption }} kW/h</strong>
          </div>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { Api } from "@/api";
import { HistoricChart } from "../components";

export default {
  name: "Detectors",
  data() {
    return {
      room: {},
      consumption: {},
      dialog: false
    };
  },
  components: {
    HistoricChart
  },
  async beforeCreate() {
    const idRoom = this.$route.params.idRoom;
    this.room = await Api.RoomsApi.get(idRoom);
    this.consumption = await Api.RoomsApi.getConsumption(idRoom);
  },
  methods: {
    getImg(detectorName) {
      const images = require.context("../../public/img/", false, /\.png$/);
      if (
        [
          "sound_detectors",
          "thermo_detectors",
          "movement_detectors",
          "luminosity_detectors"
        ].includes(detectorName)
      ) {
        return images("./" + detectorName + ".png");
      }
      return images("./luminosity_detectors.png");
    },
    getDetectorsName(detector) {
      if (detector === "movement_detectors") {
        return "Détecteurs gaz";
      } else if (detector === "sound_detectors") {
        return "Détecteurs réseau";
      } else if (detector === "luminosity_detectors") {
        return "Détecteurs de lumière";
      } else if (detector === "thermo_detectors") {
        return "Détecteurs de température";
      } else {
        return detector.replace("_", " ");
      }
    },
    getDetectorName(detector) {
      const name = detector.replace("_", " ");
      return name.slice(0, -1);
    },
    getDetectorType(detector) {
      const arraySplit = detector.split("_");
      return arraySplit[0];
    }
  }
};
</script>
