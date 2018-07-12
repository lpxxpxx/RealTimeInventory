<template>
  <div class="container">
    <div class="warehouse" v-if="type===0">
      <data-count-chart :main="main" :money="money"></data-count-chart>
      <apartmen-chart :main="main" :money="money"></apartmen-chart>
    </div>
    <div class="wareage" v-if="type===1">
      <data-count-age-chart :mainage="mainage"></data-count-age-chart>
      <apartmen-age-chart :mainage="mainage"></apartmen-age-chart>
    </div>
    <div class="wareagetotal" v-if="type===2">
      <data-count-age-chart-total :mainagetotal="mainagetotal"></data-count-age-chart-total>
      <apartmen-age-chart-total :mainagetotal="mainagetotal"></apartmen-age-chart-total>
    </div>
  </div>
</template>

<style>
.weui-tabbar {
  display:none !important;
}
.warehouse, .wareage, .wareagetotal {
  padding-top: 46px;
}
</style>

<script>
import DataCountChart from './DataCountChart';
import ApartmenChart from './ApartmenChart';
import DataCountAgeChart from './DataCountAgeChart';
import ApartmenAgeChart from './ApartmenAgeChart';
import DataCountAgeChartTotal from './DataCountAgeChartTotal';
import ApartmenAgeChartTotal from './ApartmenAgeChartTotal';
export default {
  props: ['type', 'main', 'mainage', 'mainagetotal', 'money'],
  components: {
    DataCountChart,
    ApartmenChart,
    DataCountAgeChart,
    ApartmenAgeChart,
    DataCountAgeChartTotal,
    ApartmenAgeChartTotal
  },
  methods: {
    okChange: function (res) {
      this.type = res
    }
  }
}
</script>
