<template>
  <div class="w-1/2 h-3/4 mx-auto">
    <line-chart :chart-data="datas" />
  </div>
</template>

<script>
import LineChart from './local-components/LineChart.js' ;
import moment from 'moment';

export default {
  components: { LineChart },
  name: "HistoricChart",
  props: {
    historicArray: Array,
    label: String,
  },
  data () {
    return {
      datas: { labels: [], datasets: []}
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData() {
      moment.locale('fr');
      const filteredHistoricArray = this.historicArray.filter((el) => el.value !== null);
      const historicDates = filteredHistoricArray.map((el) => {
        const date = moment(el.date);
        return date.format('L LT');
      });

      this.datas = {
        labels: historicDates,
        datasets: [{
          label: this.label,
          backgroundColor: "transparent",
          borderColor: "rgba(1, 116, 188, 0.50)",
          pointBackgroundColor: "rgba(171, 71, 188, 1)",
          data: filteredHistoricArray.map((el) => el.value),
        }]
      }
    },
  },
  watch: {
    historicArray: function() {
      this.fillData();
    }
  }
}
</script>
