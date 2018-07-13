<template>
  <div class="datacount">
      <div class="topbox">
          <swiper dots-position="center" dots-class="dots" height="160px">
            <swiper-item>
              <div class="main-val">
                <p class="mv-title">占比：{{ scale[1].percent }}</p>
                <countup :end-val="scale[0].percent" :duration="2" :decimals="0"></countup>&nbsp;元
                <p class="mv-title">当前公司{{ scale[0].name }}</p>
              </div>
            </swiper-item>
            <swiper-item>
                <div class="main-val">
                <p class="mv-title">占比：{{ scale[3].percent }}</p>
                <countup :end-val="scale[2].percent" :duration="2" :decimals="0"></countup>&nbsp;件
                <p class="mv-title">当前公司{{ scale[2].name }}PCS</p>
              </div>
            </swiper-item>
          </swiper>
      </div>
      <div class="total">
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item>
            <span>当前公司总存货(元)</span>
            <p>{{ $toThousands(main.totalMoney) }}</p>
          </grid-item>
          <grid-item>
            <span>当前公司总存货PCS</span>
            <p>{{ $toThousands(main.totalPcs) }}</p>
          </grid-item>
        </grid>
      </div>
  </div>
</template>

<style scoped>
  .datacount .topbox{
    width: 100%;
    padding: 50px 0 0 0;
    box-sizing: border-box;
    color:#fff;
    background-color: #5077a9;
  }
  .mv-title{
    font-size: 12px;
    color: rgba(255,255,255,0.4);
  }
  .main-val span{
    font-size: 34px;
    font-weight: 600;
  }
  .main-val{
    text-align: center;
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
<style>
  .dots > a > .vux-icon-dot.active{
    background-color: #ffb924 !important;
  }
</style>

<script>
import { Countup, XButton, Grid, GridItem, Swiper, SwiperItem } from 'vux'
export default {
  props: ['main', 'money'],
  components: {
    Countup,
    XButton,
    Grid,
    GridItem,
    Swiper,
    SwiperItem
  },
  computed: {
    scale: function() {
      var res = [];
      switch (this.money) {
        case 0:
          res[0] = {name: 'FBA库存', percent: parseInt(this.main.fbaMoney)};
          res[1] = {name: '占总数比', percent: (this.main.fbaMoney / this.main.totalMoney * 100).toFixed(2) + '%'};
          res[2] = {name: 'FBA库存', percent: parseInt(this.main.fbaPcs)};
          res[3] = {name: '占总数比', percent: (this.main.fbaPcs / this.main.totalPcs * 100).toFixed(2) + '%'};
          break;
        case 1:
          res[0] = {name: '海外在途', percent: parseInt(this.main.overseaTransferMoney)};
          res[1] = {name: '占总数比', percent: (this.main.overseaTransferMoney / this.main.totalMoney * 100).toFixed(2) + '%'};
          res[2] = {name: '海外在途', percent: parseInt(this.main.overseaTransferPcs)};
          res[3] = {name: '占总数比', percent: (this.main.overseaTransferPcs / this.main.totalPcs * 100).toFixed(2) + '%'};
          break;
        case 2:
          res[0] = {name: '头程在途', percent: parseInt(this.main.headMoney)};
          res[1] = {name: '占总数比', percent: (this.main.headMoney / this.main.totalMoney * 100).toFixed(2) + '%'};
          res[2] = {name: '头程在途', percent: parseInt(this.main.headPcs)};
          res[3] = {name: '占总数比', percent: (this.main.headPcs / this.main.totalPcs * 100).toFixed(2) + '%'};
          break;
        case 3:
          res[0] = {name: '中转仓库存', percent: parseInt(this.main.transferWarehouseMoney)};
          res[1] = {name: '占总数比', percent: (this.main.transferWarehouseMoney / this.main.totalMoney * 100).toFixed(2) + '%'};
          res[2] = {name: '中转仓库存', percent: parseInt(this.main.transferWarehousePcs)};
          res[3] = {name: '占总数比', percent: (this.main.transferWarehousePcs / this.main.totalPcs * 100).toFixed(2) + '%'};
          break;
        default:
          res[0] = {name: '海外仓库存', percent: parseInt(this.main.overseaStockMoney)};
          res[1] = {name: '占总数比', percent: (this.main.overseaStockMoney / this.main.totalMoney * 100).toFixed(2) + '%'};
          res[2] = {name: '海外仓库存', percent: parseInt(this.main.overseaStockPcs)};
          res[3] = {name: '占总数比', percent: (this.main.overseaStockPcs / this.main.totalPcs * 100).toFixed(2) + '%'};
          break;
      }
      return res;
    }
  }
};
</script>
