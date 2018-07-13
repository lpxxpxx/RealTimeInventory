<template>
  <div class="datacount">
      <div class="topbox">
          <div class="main-val">
            <countup :end-val="Number(mainage.totalAvgAge.toFixed(0))" :duration="2" :decimals="0"></countup>&nbsp;天
            <p class="mv-title">当前公司{{ moneyTypeHeader[money] }}平均库龄</p>
          </div>
      </div>
      <div class="total">
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item v-for="(item, index) in dept" :key="index">
            <span>{{ item.text }}</span>
            <p>{{ item.value }}<span>&nbsp;万元</span></p>
            <span class="grid-bot">{{ item.percent }}</span>
          </grid-item>
        </grid>
      </div>
  </div>
</template>

<style scoped>
  .datacount .topbox{
    width: 100%;
    padding: 50px 0;
    box-sizing: border-box;
    color:#fff;
    background-color: #5077a9;
    text-align: center;
  }
  .mv-title{
    font-size: 12px;
    color: rgba(255,255,255,0.4);
  }
  .main-val span{
    font-size: 38px;
    font-weight: 600;
  }
  .total{
    background-color:#5077a9;
    text-align: center;
  }
  .weui-grid{
    padding:10px 6px;
  }
  .weui-grids:before{
    border-top: none;
  }
  .total span,.total p{
    color:#fff;
    opacity: 0.4;
    font-size: 12px;
  }
  .total p{
    font-size: 16px;
    opacity: 0.9;
  }
  .total p span{
    font-size: 12px;
  }
  .grid-bot{
    
  }
  .weui-grid:active{
    background-color: #5e84bb;
  }
  
</style>

<script>
import { Countup, XButton, Grid, GridItem } from 'vux'
export default {
  props: ['mainage', 'money'],
  components: {
    Countup,
    XButton,
    Grid,
    GridItem
  },
  data() {
    return {
      totalmoney: '',
      moneyTypeHeader: ['FBA', '在途', '头程', '中转仓', '海外仓']
    };
  },
  computed: {
    dept: function() {
      var res = [];
      res.push({text: '0~30', value: Number((this.mainage.money30 / 10000).toFixed(0)), percent: (this.mainage.money30 / this.mainage.moneyAll * 100).toFixed(0) + '%', a: 1});
      res.push({text: '30~90', value: Number((this.mainage.money90 / 10000).toFixed(0)), percent: (this.mainage.money90 / this.mainage.moneyAll * 100).toFixed(0) + '%', a: 1});
      res.push({text: '90~150', value: Number((this.mainage.money150 / 10000).toFixed(0)), percent: (this.mainage.money150 / this.mainage.moneyAll * 100).toFixed(0) + '%', a: 1});
      res.push({text: '150+', value: Number((this.mainage.money200 / 10000).toFixed(0)), percent: (this.mainage.money200 / this.mainage.moneyAll * 100).toFixed(0) + '%', a: 1});
      return res;
    }
  },
};
</script>
