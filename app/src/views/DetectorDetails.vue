<template>
  <v-container>
    <div class="text-h5 my-5">Détails :</div>
    <div class="d-flex justify-space-around">
      <div>
        <p>Etat :</p>
        <v-switch
            v-model="detector.state === 'on'"
            :label="detector.state === 'on' ? 'on' : 'off'"
            @change="setState"
        />
      </div>
      <div>
        <p>Mode :</p>
        <v-switch
            v-model="detector.handler === 'auto'"
            :label="detector.handler === 'auto' ? 'auto' : 'manuel'"
            :disabled="detector.state === 'off'"
            @change="setHandler"
        />
      </div>
    </div>
    <div class="d-flex flex-row align-center justify-space-between">
      <v-slider
          :disabled="detector.state === 'off'"
          label="Entrez une valeur"
          v-model="value"
          thumb-color="primary"
          thumb-label="always"
          :min="$route.params.type === 'thermo' ? detector.min : 0"
          :max="$route.params.type === 'thermo' ? detector.max : 100"
      ></v-slider>
      <v-btn
          :disabled="detector.state === 'off'"
          color="primary"
          elevation="2"
          @click="setValue"
      >Envoyer</v-btn>
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
import {io} from "socket.io-client";

export default {
  name: "DetectorDetails",
  data() {
    return {
      detector: {},
      historic: [],
      value: 0,
      type: "",
      socket: io('ws://localhost:3000', {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd"
        }
      }),
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
        return 'Réseau détecté'
      } else if (type === 'movement') {
        return 'Gaz détecté'
      } else {
        return '';
      }
    },
    async setState(event) {
      const idDetector = this.$route.params.idDetector;
      const type = this.$route.params.type;
      const result = await Api.DetectorsApi.put(
          idDetector,
          type,
          event ? 'on' : 'off',
          this.detector.handler)
      this.detector = { ...this.detector, state: result[0], handler: result[1]};
    },
    async setHandler(event) {
      const idDetector = this.$route.params.idDetector;
      const type = this.$route.params.type;
      const result = await Api.DetectorsApi.put(
          idDetector,
          type,
          this.detector.state,
          event ? 'auto' : 'manual')
      this.detector = { ...this.detector, state: result[0], handler: result[1]};
    },
    async setValue() {
      await Api.DetectorsApi.post(this.$route.params.idDetector, this.$route.params.type, this.value);
    }
  },
  mounted() {
    this.socket.on('historic', (data) => {
      // Listen to socket
      const detectorId = data.thermo_id || data.sound_id ||data.movement_id || data.luminosity_id;
      if (detectorId
          && detectorId === parseInt(this.$route.params.idDetector)
          && data.type
          && data.type === this.$route.params.type
      ) {
        console.log('Received from socket : ', data);
        this.historic = this.historic.concat(data);
      }
    })
  },
  async beforeCreate() {
    const idDetector = this.$route.params.idDetector;
    const type = this.$route.params.type;
    const detector = await Api.DetectorsApi.get(idDetector, type);
    this.detector = detector.detector;
    const filteredHistory = detector.historic.filter((d) => d.value !== null);
    this.value = filteredHistory[filteredHistory.length-1].value;
    this.historic = filteredHistory;
  },
};
</script>
