<template>
  <div class="content">
    <canvas id="chart4"></canvas>
  </div>
</template>

<style lang="less" scoped>
.content {
  background: #fff;
  padding-bottom: 40px;
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
  props: ['mainagetotal'],
  mounted: function() {
    this.getChartData();
  },
  data() {
    return {
      timeDimensionIndex: 0,
      index: 0,
      chart: null,
      orgAvgAge: []
    };
  },
  computed: {
    data: function() {
      var _this = this,
          res = [];
      this.mainagetotal.orgAgeList.map(function(dept) {
        let name = '';
        if(dept.orgName.length > 4) {
          name = dept.orgName.substring(dept.orgName.length-3, dept.orgName.length-1);
        } else {
          name = dept.orgName.substring(dept.orgName.length-2);
        }
        res.push({dept: name, name: '0~30', count: Number((dept.orgMoney30 / 10000).toFixed(0))});
        res.push({dept: name, name: '30~90', count: Number((dept.orgMoney90 / 10000).toFixed(0))});
        res.push({dept: name, name: '90~150', count: Number((dept.orgMoney150 / 10000).toFixed(0))});
        res.push({dept: name, name: '150+', count: Number((dept.orgMoney200 / 10000).toFixed(0))});
        res.push({dept: name, name: '平均库龄', count: dept.orgAvgAge / 100000000});
      });
      return res;
    }
  },
  methods: {
    getChartData: function() {
      var _this = this;
      var chart = new F2.Chart({
        width: window.innerWidth,
        height:
          window.innerWidth > window.innerHeight
            ? window.innerHeight - 54
            : window.innerWidth * 0.707,
        id: 'chart4',
        pixelRatio: window.devicePixelRatio,
      });
      chart.source(this.data);
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
            if (map[name] && value > 0.000005) {
              map[name].value = value + ' (万元)';
            } else if (value == 0) {
              map[name].value = value + ' (万元)';
            } else {
              map[name].value = (value * 100000000).toFixed(0) + ' (天)';
            }
          });
          legend.setItems(Object.values(map));
        },
        onHide(tooltip) {
          const legend = chart.get('legendController').legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        }
      });

      chart.interval().position('dept*count').color('name').adjust('stack');
      chart.render();
    }
  }
};
</script>