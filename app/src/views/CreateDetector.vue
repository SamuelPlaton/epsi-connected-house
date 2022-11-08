<template>
    <v-container class="mx-10">
      <div class="text-h4 my-5">Nouveau capteur</div>
      <v-text-field label="Libellé" v-model="label" />
      <v-select label="Type" v-model="type" :items="[
        {text:'Luminosité', value: 'luminosity'},
        {text:'Gas', value: 'movement'},
        {text:'Température', value: 'thermo'},
        {text:'Réseau', value: 'sound'}
        ]">
      </v-select>
      <v-btn
        color="primary"
        elevation="2"
        @click="setValue"
      >Envoyer</v-btn>
    </v-container>
</template>
<script>
import { Api } from "@/api";

export default {
  name: "CreateDetector",
  data() {
    return {
      label: "",
      type: "",
      room_id: null
    };
  },
  methods: {
    async setValue() {
      const response = await Api.DetectorsApi.create(this.label, this.room_id, this.type);

      this.$router.push({
        name: 'DetectorDetails',
        params: { idDetector: response[0].id, type: this.type },
      })
    }
  },
  async created() {
    this.room_id = this.$route.params.idRoom;
  },
};
</script>
