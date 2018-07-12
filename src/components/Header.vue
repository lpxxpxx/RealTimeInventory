<template>
  <div class="headerfixed">
    <x-header title="slot:overwrite-title" :left-options="{backText:''}">
      <div class="overwrite-title-demo" slot="overwrite-title">
        <button-tab>
          <button-tab-item selected @on-item-click = "$emit('typeText',0);">{{ tab1 }}</button-tab-item>
          <button-tab-item @on-item-click = "$emit('typeText',1);">{{ tab2 }}</button-tab-item>
          <button-tab-item @on-item-click = "$emit('typeText',2);">{{ tab3 }}</button-tab-item>
        </button-tab>
      </div>
      <a class="iconfont icon-chart" slot="right" @click="indexChange" :style="{color: index ? '#fff' : '#ccc'}"></a>
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
  data() {
    return {
      tab1: "实时库存",
      tab2: "实时库龄",
      tab3: "实时总库龄",
      index: 0
    }
  },
  methods: {
    indexChange: function() {
      this.index = this.index ? 0 : 1;
      this.$emit('indexText', this.index);
    }
  }
};
</script>
