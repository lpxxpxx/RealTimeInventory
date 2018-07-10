<template>
  <div class="container">
    <div class="warehouse" v-show="type===0">
      <data-count></data-count>
      <apartmen></apartmen>
    </div>
    <div class="wareage" v-show="type===1">
      <data-countAge v-bind:type = "type"></data-countAge>
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
import DataCount from './Datacount';
import Apartmen from './Apartmen';
import DataCountAge from './DatacountAge';
import ApartmenAge from './ApartmenAge';
export default {
  props: ['type'],
  components: {
    HeaderSelf,
    DataCount,
    Apartmen,
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
