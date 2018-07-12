<template>
  <div class="main">
    <header-self @typeText="okChange($event)" @indexText="indexChange($event)"></header-self>
    <main-table :type="type" :main="main" :mainage="mainage" :mainagetotal="mainagetotal" :money="money" :status="status" v-if="index===0"></main-table>
    <main-chart :type="type" :main="main" :mainage="mainage" :mainagetotal="mainagetotal" :money="money" v-if="index===1"></main-chart>
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
  beforeMount: function() {
    var _this = this;
    this.$http.get("http://purchase-brand.aukeyit.com/api/stock?type=" + _this.money).then(function (resp) {
      if (resp.data.code == 200) {
        _this.main = resp.data.data;
        _this.status=0;
      }
    }).catch(function(resp) {
      _this.$vux.toast.text('加载失败', 'middle');
    });
    this.$http.get("http://purchase-brand.aukeyit.com/api/age?type=1").then(function (resp) {
      if (resp.data.code == 200) {
        _this.mainage = resp.data.data;
      }
    }).catch(function(resp) {
      _this.$vux.toast.text('加载失败', 'middle');
    });
    this.$http.get("http://purchase-brand.aukeyit.com/api/all").then(function (resp) {
      if (resp.data.code == 200) {
        _this.mainagetotal = resp.data.data;
      }
    }).catch(function(resp) {
      _this.$vux.toast.text('加载失败', 'middle');
    });
  },
  data() {
    return {
      type: 0,
      index: 0,
      money: 1,
      status: 1,
      main: {},
      mainage: {},
      mainagetotal: {}
    }
  },
  watch: {
    money: function() {
      var _this = this;
      console.log(1)
      this.$http.get("http://purchase-brand.aukeyit.com/api/stock?type=" + _this.money).then(function (resp) {
        if (resp.data.code == 200) {
          _this.main = resp.data.data
        }
      }).catch(function(resp) {
        _this.$vux.toast.text('加载失败', 'middle');
      });
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
