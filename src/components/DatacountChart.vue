<template>
  <div>
    <div>
      <swiper dots-position="center" dots-class="dots" :height="height">
        <swiper-item style="position: relative;">
          <div>
            <canvas id="myChart1"></canvas>
          </div>
        </swiper-item>
        <swiper-item>
          <div>
            <canvas id="myChart2"></canvas>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="total">
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item v-for="(item, index) in chartData" :key="index">
          <span>{{ index === 0 ? '当前公司总存货(元)' : '当前公司总存货PCS' }}</span>
          <p>{{ item.percent }}</p>
        </grid-item>
      </grid>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tab-item {
  background: #5077a9!important;
  font-size: 1.5rem;
}
.vux-slider {
  background: #5077a9!important;
}
.total{
  background-color:#5e84bb;
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
  line-height: 18px;
}
.weui-grid:active{
  background-color: #5e84bb;
}
</style>


<script>
import F2 from '@antv/f2';
import { Tab, TabItem, Swiper, SwiperItem, Grid, GridItem } from 'vux';
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Grid,
    GridItem
  },
  mounted: function() {
    this.renderChart();
    this.renderChart2();
  },
  data() {
    return {
      timeDimensionIndex: 0,
      list: ['总库存', '可售库存'],
      index: 0,
      chart: null,
      chartData: [
        { name: '总库存', percent: 10000000.00, a: 1 },
        { name: '可售库存', percent: 6597437.32, a: 1 }
      ],
      chartDataPCS: [
        { name: '总库存', percent: 1000000, a: 1 },
        { name: '可售库存', percent: 657437, a: 1 }
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
        id: 'myChart1',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });
      // Step 2: 载入数据源
      chart.source(_this.chartData, {
        percent: {
          formatter(val) {
            return val + '元';
          }
        }
      });
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
        .position('a*percent')
        .color('name', ['#324F77', '#857658'])
        .adjust('stack')
        .size(5);
      chart.guide().html({
        position: ['50%', '45%'],
        html: `<div style="width: 200px;height: 40px;text-align: center;">
                    <div style="font-size: 12px;color:#FF9F26;">7月：${Number(_this.chartData[0].percent).toFixed(2)}</div>
                    <div style="font-size: 18px;color:#fff;">${Number(
                      _this.chartData[1].percent
                    ).toFixed(2)}</div>
                    <div style="font-size: 12px;color:#ddd;">可售库存（万元）</div>
                </div>`
      });
      // Step 4: 渲染图表
      chart.render();
      this.chart = chart;
    },
    renderChart2: function() {
      let _this = this;
      const chart = new F2.Chart({
        width: window.innerWidth,
        height: _this.height,
        id: 'myChart2',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });
      // Step 2: 载入数据源
      chart.source(_this.chartDataPCS, {
        percent: {
          formatter(val) {
            return val + '元';
          }
        }
      });
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
        .position('a*percent')
        .color('name', ['#324F77', '#857658'])
        .adjust('stack')
        .size(5);
      chart.guide().html({
        position: ['50%', '45%'],
        html: `<div style="width: 200px;height: 40px;text-align: center;">
                    <div style="font-size: 12px;color:#FF9F26;">7月：${Number(_this.chartData[0].percent)}</div>
                    <div style="font-size: 18px;color:#fff;">${Number(
                      _this.chartData[1].percent
                    )}</div>
                    <div style="font-size: 12px;color:#ddd;">可售库存（PCS）</div>
                </div>`
      });
      // Step 4: 渲染图表
      chart.render();
      this.chart = chart;
    }
  }
};
</script>