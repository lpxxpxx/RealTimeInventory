<template>
  <div class="content">
    <canvas id="chart3"></canvas>
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
  mounted: function() {
    this.getChartData();
  },
  data() {
    return {
      timeDimensionIndex: 0,
      index: 0,
      chart: null,
      chartData: [
        { name: '总库存', percent: 3.22, a: 1 },
        { name: '可售库存', percent: 2.0, a: 1 }
      ],
      data: [
        {
          name: '库存总额',
          部门: '品牌一部',
          数量: 18.9
        }, {
          name: '库存总额',
          部门: '品牌二部',
          数量: 28.8
        }, {
          name: '库存总额',
          部门: '品牌三部',
          数量: 39.3
        }, {
          name: '库存总额',
          部门: '品牌四部',
          数量: 81.4
        }, {
          name: '库存总额',
          部门: '品牌五部',
          数量: 47
        }, {
          name: '库存总额',
          部门: '品牌六部',
          数量: 20.3
        }, {
          name: '库存总额',
          部门: '品牌七部',
          数量: 24
        }, {
          name: '库存总额',
          部门: '品牌八部',
          数量: 35.6
        }, {
          name: '可售总额',
          部门: '品牌一部',
          数量: 12.4
        }, {
          name: '可售总额',
          部门: '品牌二部',
          数量: 23.2
        }, {
          name: '可售总额',
          部门: '品牌三部',
          数量: 34.5
        }, {
          name: '可售总额',
          部门: '品牌四部',
          数量: 99.7
        }, {
          name: '可售总额',
          部门: '品牌五部',
          数量: 52.6
        }, {
          name: '可售总额',
          部门: '品牌六部',
          数量: 35.5
        }, {
          name: '可售总额',
          部门: '品牌七部',
          数量: 37.4
        }, {
          name: '可售总额',
          部门: '品牌八部',
          数量: 42.4
        }, {
          name: '可售比例',
          部门: '品牌一部',
          数量: 18.9
        }, {
          name: '可售比例',
          部门: '品牌二部',
          数量: 28.8
        }, {
          name: '可售比例',
          部门: '品牌三部',
          数量: 39.3
        }, {
          name: '可售比例',
          部门: '品牌四部',
          数量: 81.4
        }, {
          name: '可售比例',
          部门: '品牌五部',
          数量: 47
        }, {
          name: '可售比例',
          部门: '品牌六部',
          数量: 20.3
        }, {
          name: '可售比例',
          部门: '品牌七部',
          数量: 24
        }, {
          name: '可售比例',
          部门: '品牌八部',
          数量: 35.6
        }
      ]
    };
  },
  methods: {
    getChartData: function() {
      var chart = new F2.Chart({
        width: window.innerWidth,
        height:
          window.innerWidth > window.innerHeight
            ? window.innerHeight - 54
            : window.innerWidth * 0.707,
        id: 'chart3',
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

      chart.interval().position('部门*数量').color('name').adjust('stack');
      chart.render();
    }
  }
};
</script>