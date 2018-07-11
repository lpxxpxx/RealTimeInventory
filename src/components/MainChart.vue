<template>
  <div class="container">
    <div class="warehouse" v-show="type===0">
      <data-count-chart></data-count-chart>
      <apartmen-chart></apartmen-chart>
    </div>
    <div class="wareage" v-show="type===1">
      <data-count-age-chart></data-count-age-chart>
      <apartmen-age-chart></apartmen-age-chart>
    </div>
  </div>
</template>

<style>
.weui-tabbar{
  display:none !important;
}
.warehouse,.wareage{
  padding-top: 46px;
}
</style>

<script>
import HeaderSelf from './Header';
import DataCountChart from './DataCountChart';
import ApartmenChart from './ApartmenChart';
import DataCountAgeChart from './DataCountAgeChart';
import ApartmenAgeChart from './ApartmenAgeChart';
export default {
  props: ['type'],
  components: {
    HeaderSelf,
    DataCountChart,
    ApartmenChart,
    DataCountAgeChart,
    ApartmenAgeChart
  },
  methods: {
    okChange: function (res) {
      this.type = res
    }
  }
}
</script>
