<template>
  <div class="datacount">
      <div style="background: #5077a9">
        <canvas id="chart2"></canvas>
      </div>
      <div class="total">
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item v-for="(item, index) in chartDataAge" :key="index">
            <span>{{ item.name }}</span>
            <p>{{ item.value }}<span>&nbsp;万元</span></p>
            <span class="grid-bot">{{ item.percent }}</span>
          </grid-item>
        </grid>
      </div>
  </div>
</template>

<style scoped>
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
    font-size: 14px;
    opacity: 0.9;
  }
  .total p span{
    font-size: 12px;
  }
  .weui-grid:active{
    background-color: #5e84bb;
  }
  
</style>

<script>
import F2 from '@antv/f2';
import { Countup, XButton, Grid, GridItem } from 'vux'
export default {
  props: ['mainage', 'money', 'status'],
  components: {
    Countup,
    XButton,
    Grid,
    GridItem
  },
  mounted() {
    this.renderChart();
  },
  data() {
    return {
      moneyTypeHeader: ['FBA', '在途', '头程', '中转仓', '海外仓'],
      chart: null
    };
  },
  watch: {
    status: function() {
      if(this.status % 2 === 0) {
        this.chart.clear();
        this.renderChart();
      }
    }
  },
  computed: {
    height: function() {
      return window.innerWidth > window.innerHeight
              ? window.innerHeight - 54
              : window.innerWidth * 0.707 + ''
    },
    chartDataAge: function() {
      var res = [];
      res.push({name: '0~30', value: Number((this.mainage.money30 / 10000).toFixed(2)), percent: (this.mainage.money30 / this.mainage.moneyAll * 100).toFixed(2) + '%', a: 1});
      res.push({name: '30~90', value: Number((this.mainage.money90 / 10000).toFixed(2)), percent: (this.mainage.money90 / this.mainage.moneyAll * 100).toFixed(2) + '%', a: 1});
      res.push({name: '90~150', value: Number((this.mainage.money150 / 10000).toFixed(2)), percent: (this.mainage.money150 / this.mainage.moneyAll * 100).toFixed(2) + '%', a: 1});
      res.push({name: '150+', value: Number((this.mainage.money200 / 10000).toFixed(2)), percent: (this.mainage.money200 / this.mainage.moneyAll * 100).toFixed(2) + '%', a: 1});
      return res;
    }
  },
  methods: {
    renderChart: function() {
      let _this = this;
      const chart = new F2.Chart({
        width: window.innerWidth,
        height: _this.height,
        id: 'chart2',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });
      // Step 2: 载入数据源
      chart.source(_this.chartDataAge);
      chart.tooltip(false);
      chart.legend({
        position: 'right',
        nameStyle: {
          opacity: 0.4,
          fill: '#fff', // 文本的颜色
          fontSize: 16 // 文本大小
        },
        itemFormatter(val) {
          return val;
        }
      });
      // chart.legend('name', false);
      // 配置坐标系的类型 分为笛卡尔坐标系和极坐标系 'react':'笛卡尔','polar':'极坐标系'
      chart.coord('polar', {
        // startAngle: {Number}, // 起始弧度
        // endAngle: {Number}, // 结束弧度
        transposed: true, // 是否进行转置
        innerRadius: 0.8, // 空心圆的半径大小
        radius: 0.9 // 实心圆的半径大小
      });
      chart.axis(false);
      chart
        .interval()
        .position('a*value')
        .color('name')
        .adjust('stack')
        .size(5);
      chart.guide().html({
        position: ['50%', '50%'],
        html: `<div style="width: 200px;height: 40px;text-align: center;">
                    <div style="font-size: 18px;color:#fff;">${Number(_this.mainage.totalAvgAge)}天</div>
                    <div style="font-size: 12px;color:#ddd;">当前公司${_this.moneyTypeHeader[_this.money]}平均库龄</div>
                </div>`
      });
      // Step 4: 渲染图表
      chart.render();
      this.chart = chart;
    }
  }
};
</script>
