<template>
  <div class="container">
    <div class="warehouse" v-if="type===0">
      <data-count :main="main" :money="money"></data-count>
      <apartmen :main="main" :money="money" v-if="status===0"></apartmen>
    </div>
    <div class="wareage" v-if="type===1">
      <data-countAge :mainage="mainage" v-bind:type = "type"></data-countAge>
      <apartmenAge :mainage="mainage" v-if="status===0"></apartmenAge>
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
  props: ['type', 'main', 'mainage', 'money', 'status'],
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
