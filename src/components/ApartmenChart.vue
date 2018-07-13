<template>
  <div class="content">
    <canvas id="chart"></canvas>
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
  props: ['main', 'money', 'status'],
  mounted: function() {
    this.renderChart();
  },
  data() {
    return {
      timeDimensionIndex: 0,
      index: 0,
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
    maxMoney: function() {
      var res = 0;
      this.main.orgStockList.map(function(dept) {
        if(dept.orgMoney > res) res = dept.orgMoney;
      })
      return res;
    },
    data: function() {
      var _this = this,
          res = [];
      this.main.orgStockList.map(function(dept) {
        let name = '';
        if(dept.orgName.length > 4) {
          name = dept.orgName.substring(dept.orgName.length-3, dept.orgName.length-1);
        } else {
          name = dept.orgName.substring(dept.orgName.length-2);
        }
        res.push({name: '库存总额', dept: name, count: Number((dept.orgMoney / 10000).toFixed(0))});
        switch (_this.money) {
          case 0:
            res.push({name: 'FBA库存', dept: name, count: Number((dept.fbaMoney / 10000).toFixed(0))});
            res.push({name: '占总数比', dept: name, count: Number((dept.fbaMoney / dept.orgMoney / 10000 * _this.maxMoney).toFixed(0)) + Number((_this.maxMoney / 10000000000).toFixed(6))});
            break;
          case 1:
            res.push({name: '海外在途', dept: name, count: Number((dept.overseaTransferMoney / 10000).toFixed(0))});
            res.push({name: '占总数比', dept: name, count: Number((dept.overseaTransferMoney / dept.orgMoney / 10000 * _this.maxMoney).toFixed(0)) + Number((_this.maxMoney / 10000000000).toFixed(6))});
            break;
          case 2:
            res.push({name: '头程在途', dept: name, count: Number((dept.headMoney / 10000).toFixed(0))});
            res.push({name: '占总数比', dept: name, count: Number((dept.headMoney / dept.orgMoney / 10000 * _this.maxMoney).toFixed(0)) + Number((_this.maxMoney / 10000000000).toFixed(6))});
            break;
          case 3:
            res.push({name: '中转仓库存', dept: name, count: Number((dept.transferWarehouseMoney / 10000).toFixed(0))});
            res.push({name: '占总数比', dept: name, count: Number((dept.transferWarehouseMoney / dept.orgMoney / 10000 * _this.maxMoney).toFixed(0)) + Number((_this.maxMoney / 10000000000).toFixed(6))});
            break;
          default:
            res.push({name: '海外仓库存', dept: name, count: Number((dept.overseaStockMoney / 10000).toFixed(0))});
            res.push({name: '占总数比', dept: name, count: Number((dept.overseaStockMoney / dept.orgMoney / 10000 * _this.maxMoney).toFixed(0)) + Number((_this.maxMoney / 10000000000).toFixed(6))});
            break;
        }
      });
      return res;
    }
  },
  methods: {
    renderChart: function() {
      var _this = this;
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
            if (map[name] && name == '占总数比') {
              let s = (value + '').split('.');
              map[name].value = (s[0] / s[1] * 100).toFixed(2) + '%';
            } else if (map[name]) {
              map[name].value = value + ' (万元)';
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