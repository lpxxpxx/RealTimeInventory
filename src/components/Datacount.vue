<template>
  <div class="datacount">
      <div class="topbox">
          <swiper dots-position="center" dots-class="dots" height="160px">
            <swiper-item>
              <div class="main-val">
                <p class="mv-title">占比：60%</p>
                <countup :end-val="56245521" :duration="2" :decimals="0"></countup>&nbsp;元
                <p class="mv-title">当前公司可售库存(FBA)</p>
              </div>
            </swiper-item>
            <swiper-item>
                <div class="main-val">
                <p class="mv-title">占比：55%</p>
                <span>787858</span>&nbsp;件
                <p class="mv-title">当前公司可售库存PCS</p>
              </div>
            </swiper-item>
          </swiper>
      </div>
      <div class="total">
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item v-for="(item, index) in dept" :key="index">
            <span>{{ item.text }}</span>
            <p>{{ item.value }}</p>
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
  components: {
    Countup,
    XButton,
    Grid,
    GridItem,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      dept: [
        {
          value: '10000000',
          text: '当前公司总存货(元)',
          key: 1
        },
        {
          value: '6597437',
          text: '当前公司总存货PCS',
          key: 2
        }
      ],
      height: document.documentElement.clientWidth * 0.6
    };
  }
};
</script>
