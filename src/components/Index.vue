<template>
  <div class="main">
    <header-self @typeText="okChange($event)" @indexText="indexChange($event)"></header-self>
    <main-table :type="type" v-if="index===0"></main-table>
    <main-chart :type="type" v-if="index===1"></main-chart>
    <div class="bg"></div>
  </div>
</template>

<style>
.bg {
  z-index: -2;
  background: #efefef;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<script>
import HeaderSelf from './Header';
import MainTable from './MainTable';
import MainChart from './MainChart';
export default {
  components: {
    HeaderSelf,
    MainTable,
    MainChart
  },
  data() {
    return {
      type: 0,
      index: 0
    }
  },
  methods: {
    okChange: function (res) {
      this.type = res
    },
    indexChange: function (res) {
      this.index = res
    }
  }
}
</script>
