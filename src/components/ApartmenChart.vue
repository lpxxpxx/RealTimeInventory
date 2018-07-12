<template>
  <div class="content">
    <canvas id="chart"></canvas>
  </div>
</template>

<style lang="less" scoped>
.content {
  background: #fff;
}
.tab-item {
  background: #5077a9!important;
  font-size: 1.5rem;
}
</style>


<script>
/* eslint-disable */
import F2 from '@antv/f2';
export default {
  props: ['main', 'money'],
  mounted: function() {
    this.getChartData();
  },
  data() {
    return {
      timeDimensionIndex: 0,
      index: 0,
      chart: null
    };
  },
  computed: {
    data: function() {
      var res = [];
      this.main.orgStockList.map(function(dept) {
        let name = '';
        if(dept.orgName.length > 4) {
          name = dept.orgName.substring(dept.orgName.length-3);
        } else {
          name = dept.orgName.substring(dept.orgName.length-2);
        }
        res.push({name: '库存总额', dept: name, count: Number((dept.orgMoney / 10000).toFixed(0))});
        res.push({name: '可售库存', dept: name, count: Number((dept.fbaMoney / 10000).toFixed(0))});
        res.push({name: '可售比例', dept: name, count: Number((dept.fbaMoney / dept.orgMoney * 100).toFixed(1))});
      });
      return res;
    },

  },
  methods: {
    getChartData: function() {
      var chart = new F2.Chart({
        width: window.innerWidth,
        height:
          window.innerWidth > window.innerHeight
            ? window.innerHeight - 54
            : window.innerWidth * 0.707,
        id: 'chart',
        pixelRatio: window.devicePixelRatio,
      });
      chart.source(this.data);
      chart.axis('field', {
        label: null
      });
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        onChange: function(obj) {
          const legend = chart.get('legendController').legends.top[0]; // 获取 legend
          const tooltipItems = obj.items;
          const legendItems = legend.items;
          const map = {};
          legendItems.map(item => {
            map[item.name] = F2.Util.mix({}, item);
          });
          tooltipItems.map(item => {
            const { name, value } = item;
            if (map[name]) {
              map[name].value = value;
            }
          });
          legend.setItems(Object.values(map));
        },
        onHide(tooltip) {
          const legend = chart.get('legendController').legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        }
      });

      chart.interval().position('dept*count').color('name').adjust({
        type: 'dodge',
        marginRatio: 0.05 // 设置分组间柱子的间距
      });
      chart.render();
      this.chart = chart;
    }
  }
};
</script>