<template>
  <div class="container">
    <div class="warehouse" v-show="type===0">
      <data-count-chart></data-count-chart>
      <apartmen-chart></apartmen-chart>
    </div>
    <div class="wareage" v-show="type===1">
      <data-count-age v-bind:type="type"></data-count-age>
      <apartmenAge></apartmenAge>
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
import DataCountAge from './DatacountAge';
import ApartmenAge from './ApartmenAge';
export default {
  props: ['type'],
  components: {
    HeaderSelf,
    DataCountChart,
    ApartmenChart,
    DataCountAge,
    ApartmenAge
  },
  methods: {
    okChange: function (res) {
      this.type = res
    }
  }
}
</script>
