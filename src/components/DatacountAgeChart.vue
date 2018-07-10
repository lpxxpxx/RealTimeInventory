<template>
  <div class="datacount">
      <div>
        <canvas id="chart"></canvas>
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
import F2 from '@antv/f2';
import { Countup, XButton, Grid, GridItem } from 'vux'
export default {
  props: ['type'],
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
      dept: [
        {
          value: '3674',
          percent: '36%',
          name: '0~30',
          a: 1
        },
        {
          value: '4548',
          percent: '45%',
          name: '30~90',
          a: 1
        },
        {
          value: '59797',
          percent: '58%',
          name: '90~150',
          a: 1
        },
        {
          value: '2547',
          percent: '26%',
          name: '150+',
          a: 1
        }
      ]
    };
  },
  computed: {
    height: function() {
      return window.innerWidth > window.innerHeight
              ? window.innerHeight - 54
              : window.innerWidth * 0.707 + ''
    }
  },
  methods: {
    renderChart: function() {
      let _this = this;
      const chart = new F2.Chart({
        width: window.innerWidth,
        height: _this.height,
        id: 'chart',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });
      // Step 2: 载入数据源
      chart.source(_this.dept);
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
        position: ['50%', '45%'],
        html: `<div style="width: 200px;height: 40px;text-align: center;">
                    <div style="font-size: 12px;color:#FF9F26;">7月：${Number(_this.dept[0].percent).toFixed(2)}</div>
                    <div style="font-size: 18px;color:#fff;">${Number(
                      _this.dept[1].percent
                    ).toFixed(2)}</div>
                    <div style="font-size: 12px;color:#ddd;">可售库存（万元）</div>
                </div>`
      });
      // Step 4: 渲染图表
      chart.render();
      this.chart = chart;
    }
  }
};
</script>
