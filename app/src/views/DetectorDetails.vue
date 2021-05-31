<template>
  <v-container>
    <div class="text-h5 my-5">Détails :</div>
    <div class="d-flex justify-space-around">
      <v-switch
        v-model="detector.state"
        :label="detector.state ? 'on' : 'off'"
      />
      <v-switch
        v-model="detector.handler"
        :label="detector.handler ? 'auto' : 'manual'"
        :disabled="!detector.state"
      />
    </div>
    <div class="my-5" v-if="historic.length !== 0">
      <p class="text-h5">Historique :</p>
      <HistoricChart :historicArray="historic" :label="getHistoricLabel()" />
    </div>
    <div class="my-5" v-if="historic.length === 0">
      <p>Aucun historique disponible</p>
    </div>
  </v-container>
</template>

<script>
import { Api } from "@/api";
import moment from "moment";
import { HistoricChart } from "@/components";
export default {
  name: "DetectorDetails",
  data() {
    return {
      detector: {},
      historic: [],
    };
  },
  components: {
    HistoricChart,
  },
  methods: {
    getDate(date) {
      moment.locale("fr");
      return moment(date).format("Do MMM YYYY");
    },
    getHistoricLabel() {
      const type = this.$route.params.type;
      if (type === 'thermo') {
        return 'Température (en °C)';
      } else if (type === 'luminosity') {
        return 'Luminosité (en %)'
      } else if (type === 'sound') {
        return 'Son détecté'
      } else if (type === 'movement') {
        return 'Mouvement détecté'
      } else {
        return '';
      }
    }
  },
  async beforeCreate() {
    const idDetector = this.$route.params.idDetector;
    const type = this.$route.params.type;
    const detector = await Api.DetectorsApi.get(idDetector, type);
    if (detector.detector.state === "off") {
      detector.detector.state = false;
    } else if (detector.detector.state === "on") {
      detector.detector.state = true;
    }
    if (detector.detector.handler === "manual") {
      detector.detector.handler = false;
    } else if (detector.detector.handler === "auto") {
      detector.detector.handler = true;
    }
    this.detector = detector.detector;
    const filteredHistory = detector.historic.filter((d) => d.value !== null);
    this.historic = filteredHistory;
  },
};
</script>
