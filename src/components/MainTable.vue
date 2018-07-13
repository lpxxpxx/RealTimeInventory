<template>
  <div class="container" v-if="status>0">
    <div class="warehouse" v-if="type===0">
      <data-count :main="main" :money="money"></data-count>
      <apartmen :main="main" :money="money"></apartmen>
    </div>
    <div class="wareage" v-if="type===1">
      <data-count-age :mainage="mainage" :money="money"></data-count-age>
      <apartmen-age :mainage="mainage"></apartmen-age>
    </div>
    <div class="wareagetotal" v-if="type===2">
      <data-count-age-total :mainagetotal="mainagetotal"></data-count-age-total>
      <apartmen-age-total :mainagetotal="mainagetotal"></apartmen-age-total>
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
import HeaderSelf from './Header';
import DataCount from './Datacount';
import Apartmen from './Apartmen';
import DataCountAge from './DatacountAge';
import ApartmenAge from './ApartmenAge';
import DataCountAgeTotal from './DataCountAgeTotal';
import ApartmenAgeTotal from './ApartmenAgeTotal';
export default {
  props: ['type', 'main', 'mainage', 'mainagetotal', 'money', 'status'],
  components: {
    HeaderSelf,
    DataCount,
    Apartmen,
    DataCountAge,
    ApartmenAge,
    DataCountAgeTotal,
    ApartmenAgeTotal
  },
  methods: {
    okChange: function (res) {
      this.type = res
    }
  }
}
</script>
