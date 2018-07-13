<template>
  <div class="headerfixed">
    <x-header title="slot:overwrite-title" :left-options="{backText:''}">
      <div class="overwrite-title-demo" slot="overwrite-title">
        <button-tab>
          <button-tab-item selected @on-item-click = "typeChange(0)">{{ moneyTypeHeader[money] }}库存</button-tab-item>
          <button-tab-item @on-item-click = "typeChange(1)">{{ moneyTypeHeader[money] }}库龄</button-tab-item>
          <button-tab-item @on-item-click = "typeChange(2);">实时总库龄</button-tab-item>
        </button-tab>
      </div>
      <a class="iconfont icon-chart" slot="right" @click="indexChange" :style="{color: index ? '#fff' : '#ccc'}"></a>
      <i class="iconfont icon-class" v-if="type !== 2" slot="right" @click.stop="expandChange" :class="{'icon-arrowdown':!isExpand,'icon-arrowupb':isExpand}"></i>
      <div class="content" slot="right" :class="{'close':!isExpand}">
        <ul class="items">
          <li v-for="(x, index) in moneyType" :key="index" @click="moneyTypeClick(index)" :class="{'selected': index === money}">{{ x }} <x-icon type="ios-checkmark-empty" size="30" class="icon-checked"></x-icon></li>
        </ul>
      </div>
    </x-header>
  </div>
</template>

<style scoped>
  .overwrite-title-demo{
    margin-top:6px;
    border:none;
  }
  .vux-button-group > a{
    background-color: transparent;
    color:#ddd;
  }
  .vux-button-group > a.vux-button-group-current{
    color:#fff;
    background-color: transparent;
  }
  .vux-button-group > a.vux-button-tab-item-last:after, .vux-button-group > a.vux-button-tab-item-middle:after, .vux-button-group > a.vux-button-tab-item-first:after{
    border: none;
  }
  .headerfixed{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: #5077a9;
    z-index: 999;
  }
  .vux-header{
    background-color: #5077a9;
  }
  .icon-class {
    position: absolute;
    top: 34px;
    right: 0px;
  }
  .content {
    position: absolute;
    box-sizing: border-box;
    height: 214px;
    top: 60px;
    right: 0px;
    width: 180px;
    background: #fff;
    border-radius: 12px;
    padding: 12px;
    padding-left: 0;
    padding-right: 0;
    overflow: hidden;
    transition: all .3s ease-in-out;
  }
  .close {
    height: 0px;
    padding: 0px;
  }
  .content li {
    position: relative;
    text-align: left;
    height: 38px;
    line-height: 38px;
    padding-left: 15px;
    color: #666;
  }
  .content li .vux-x-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    fill: #ffb924;
    display: none;
  }
  .content li.selected {
    background: #efeff4;
  }
  .content li.selected .icon-checked {
    display: block;
  }
</style>

<script>
import { XHeader, Actionsheet, ButtonTab, ButtonTabItem } from 'vux'
export default {
  components: {
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem
  },
  mounted () {
    document.addEventListener('click', this.expandToZero);
  },
  destroyed () {
    document.removeEventListener('click', this.expandToZero);
  },
  data() {
    return {
      type: 0,
      index: 0,
      money: 0,
      isExpand: 0,
      moneyType: ['FBA库存', '海外在途', '头程在途', '中转仓库存', '海外仓库存'],
      moneyTypeHeader: ['FBA', '在途', '头程', '中转仓', '海外仓'],
    }
  },
  methods: {
    typeChange: function(i) {
      this.type = i;
      this.$emit('typeText',i);
    },
    indexChange: function() {
      this.index = this.index ? 0 : 1;
      this.$emit('indexText', this.index);
    },
    expandChange: function() {
      this.isExpand = this.isExpand ? 0 : 1;
    },
    expandToZero: function() {
      this.isExpand = 0;
    },
    moneyTypeClick: function(index) {
      this.money = index;
      this.$emit('moneyText',index);
    }
  }
};
</script>
