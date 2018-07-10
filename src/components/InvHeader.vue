<template>
  <div class="container">
    <x-header :left-options="{backText:''}"  class="header-self" title="实时库存">
      <i class="iconfont icon-chart" slot="right"></i>
    </x-header>
  </div>
 </template>

<style scoped>
</style>

<script>
import { XHeader } from 'vux';
export default {
  components: {
    XHeader
  },
  data() {
    return {};
  }
};
</script>
