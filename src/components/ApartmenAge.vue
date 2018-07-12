<template>
  <div class="apart">
    <div :class="{ fixedtab: isfixed }" ref="tabbox">
      <tab :line-width="2" active-color='#5077a9' v-model="index">
        <tab-item active-class="activeon" @on-item-click="clickHandler" :selected="initItem === item.name" v-for="(item, index) in age" @click="initItem = item.name" :key="index">{{item.name}}</tab-item>
      </tab>
    </div>
    <div ref="listbox" :class="{ marginTop: isfixed }">
      <div class="databox" v-for="(item, index) in age" :key="index">
        <h1>{{ item.name }}</h1>
        <div class="db-item">
          <div class="it-pro">
            <x-progress :percent="Number(parseInt(item.average / maximumAmount * 100))" :show-cancel="false" class="it1"></x-progress>
          </div>
          <p>平均库龄<span>{{ item.average }}<em>&nbsp;天</em></span></p>
        </div>
        <div class="db-item">
          <div class="it-pro">
            <x-progress :percent="Number(parseInt(item.date1 / maximumAmount1 * 100))" :show-cancel="false" class="it2"></x-progress>
          </div>
          <p>0-30<span>{{ item.date1 }}<em>&nbsp;元</em></span></p>
        </div>
        <div class="db-item">
          <div class="it-pro">
            <x-progress :percent="Number(parseInt(item.date30 / maximumAmount2 * 100))" :show-cancel="false" class="it2"></x-progress>
          </div>
          <p>30-90<span>{{ item.date30 }}<em>&nbsp;元</em></span></p>
        </div>
        <div class="db-item">
          <div class="it-pro">
            <x-progress :percent="Number(parseInt(item.date90 / maximumAmount3 * 100))" :show-cancel="false" class="it3"></x-progress>
          </div>
          <p>90-150<span>{{ item.date90 }}<em>&nbsp;元</em></span></p>
        </div>
        <div class="db-item">
          <div class="it-pro">
            <x-progress :percent="Number(parseInt(item.date150 / maximumAmount4 * 100))" :show-cancel="false" class="it4"></x-progress>
          </div>
          <p>150+<span>{{ item.date150 }}<em>&nbsp;元</em></span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.databox{
  padding:0.4rem 0;
  margin: 5px;
  box-sizing:border-box;
  background-color: #fff;
  border-radius: 4px;
}
.databox h1{
  font-size: 14px;
  text-align: center;
  padding-bottom: 0.3rem;
  padding-top:0.3rem;
  color: #949494;
  font-weight: normal;
}
.db-item{
  width: 92%;
  margin: 0 auto;
  padding: 0.2rem 0;
}
.db-item p{
  position:relative;
  color: #333;
  font-size: 14px;
  margin-top: 4px;
  text-align: left;
}
.db-item p span{
  position:absolute;
  right: 0;
  bottom: 0;
  font-size: 13px;
  color: red;
}
.db-item p span em{
  font-size: 12px;
  color: #999;
  font-style: normal;
}
.fixedtab{
  position: fixed;
  top: 44px;
  left: 0;
  width: 100%;
  z-index: 999;
}
.marginTop{
  margin-top: 40px;
}
.activeon{
  color: #5077a9 !important;
  border-color: #5077a9 !important;
}
</style>

<script>
import { Tab, TabItem, XProgress } from 'vux'
export default {
  props: ['mainage'],
  components: {
    Tab,
    TabItem,
    XProgress
  },
  data() {
    return {
      initItem: '品牌一部',
      scroll: '',
      index: 0,
      isfixed: false,
      tabOffsetTop1: 10
    }
  },
  computed: {
    age:function() {
      var res = [];
      this.mainage.orgAgeList.map(function(dept) {
        res.push({name: dept.orgName, average: Number(dept.orgAvgAge.toFixed(2)), date1: Number(dept.orgMoney30.toFixed(2)), date30: Number(dept.orgMoney90.toFixed(2)), date90: Number(dept.orgMoney150.toFixed(2)), date150: Number(dept.orgMoney200.toFixed(2))});
      });
      return res;
    },
    maximumAmount: function() {
      let max = 0;
      this.mainage.orgAgeList.map(function(dept) {
        if (dept.orgAvgAge > max) max = dept.orgAvgAge;
      });
      return max;
    },
    maximumAmount1: function() {
      let max = 0;
      this.mainage.orgAgeList.map(function(dept) {
        if (dept.orgMoney30 > max) max = dept.orgMoney30;
      });
      return max;
    },
    maximumAmount2: function() {
      let max = 0;
      this.mainage.orgAgeList.map(function(dept) {
        if (dept.orgMoney90 > max) max = dept.orgMoney90;
      });
      return max;
    },
    maximumAmount3: function() {
      let max = 0;
      this.mainage.orgAgeList.map(function(dept) {
        if (dept.orgMoney150 > max) max = dept.orgMoney150;
      });
      return max;
    },
    maximumAmount4: function() {
      let max = 0;
      this.mainage.orgAgeList.map(function(dept) {
        if (dept.orgMoney200 > max) max = dept.orgMoney200;
      });
      return max;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrolling);
    this.tabOffsetTop1 = 272
  },
  methods: {
    clickHandler: function(index) {
      let targetoffTop = this.$refs.listbox.children[index].offsetTop;
      index >= 2 ? document.documentElement.scrollTop = targetoffTop - 86 : targetoffTop = 0;
      index >= 2 ? this.isfixed = true : this.isfixed = false
    },
    scrolling: function() {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scroll > this.tabOffsetTop1) {
        this.isfixed = true;
      } else {
        this.isfixed = false;
      }
    }
  }
};
</script>
