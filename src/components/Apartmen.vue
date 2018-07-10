<template>
  <div class="apart">
    <div :class="{ fixedtab: isfixed }" ref="tabbox">
      <tab :line-width="2" active-color='#5077a9' v-model="index">
        <tab-item active-class="activeon" @on-item-click="clickHandler" :selected="initItem1 === item.name" v-for="(item, index) in ware" @click="initItem1 = item.name" :key="index">{{item.name}}</tab-item>
      </tab>
    </div>
    <div ref="listbox" :class="{ marginTop: isfixed }">
      <div class="databox" v-for="(item, index) in ware" :key="index">
        <h1>{{ item.name }}</h1>
        <div class="db-item">
          <div class="it-pro">
            <x-progress :percent="60" :show-cancel="false" class="it1"></x-progress>
          </div>
          <p>库存总额：<span>{{ item.total }}<em>&nbsp;元</em></span></p>
        </div>
        <div class="db-item">
          <div class="it-pro">
            <x-progress :percent="45" :show-cancel="false" class="it2"></x-progress>
          </div>
          <p>可售库存总额：<span>{{ item.canSall }}<em>&nbsp;元</em></span></p>
        </div>
        <div class="db-item">
          <div class="it-pro">
            <x-progress :percent="71" :show-cancel="false" class="it3"></x-progress>
          </div>
          <p>可售库存占比：<span>71%</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.databox{
  padding:0.4rem 0;
  margin: 5px;
  box-sizing:border-box;
  background-color: #fff;
  border-radius: 4px;
}
.databox h1{
  font-size: 14px;
  text-align: center;
  padding-bottom: 0.3rem;
  padding-top:0.3rem;
  color: #949494;
  font-weight: normal;
}
.db-item{
  width: 92%;
  margin: 0 auto;
  padding: 0.2rem 0;
}
.db-item p{
  position:relative;
  color: #333;
  font-size: 14px;
  margin-top: 4px;
  text-align: left;
}
.db-item p span{
  position:absolute;
  right: 0;
  bottom: 0;
  font-size: 13px;
  color: red;
}
.db-item p span em{
  font-size: 12px;
  color: #999;
  font-style: normal;
}
.fixedtab{
  position: fixed;
  top: 44px;
  left: 0;
  width: 100%;
  z-index: 999;
}
.marginTop{
  margin-top: 40px;
}
.activeon{
  color: #5077a9 !important;
  border-color: #5077a9 !important;
}
</style>
<style>
.vux-tab .vux-tab-item{
  color: #808080 !important;
}
.it1 > div > div{
  background-color: #68affe;
}
.it2 > div > div{
  background-color: #ffb924;
}
.it3 > div > div{
  background-color: #ea8686;
}
.it4 > div > div{
  background-color: #b2bd05;
}
</style>


<script>
import { Tab, TabItem, XProgress } from 'vux'
export default {
  components: {
    Tab,
    TabItem,
    XProgress
  },
  data() {
    return {
      initItem1: '品牌一部',
      scroll: '',
      index: 0,
      isfixed: false,
      tabOffsetTop: 10,
      ware: [
        {
          name: '品牌一部',
          total: 544887878,
          canSall: 6898779
        },
        {
          name: '品牌二部',
          total: 87687878,
          canSall: 682398779
        },
        {
          name: '品牌三部',
          total: 21548414887878,
          canSall: 3994149
        },
        {
          name: '品牌四部',
          total: 2654948,
          canSall: 1575945
        },
        {
          name: '品牌五部',
          total: 354491484,
          canSall: 6892499997
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrolling);
    this.tabOffsetTop = this.$refs.tabbox.offsetTop + 40;
  },
  created: function() {
  },
  methods: {
    clickHandler: function(index) {
      let targetoffTop = this.$refs.listbox.children[index].offsetTop;
      index >= 2 ? document.documentElement.scrollTop = targetoffTop - 86 : targetoffTop = 0;
      index >= 2 ? this.isfixed = true : this.isfixed = false
    },
    scrolling: function() {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scroll > this.tabOffsetTop) {
        this.isfixed = true;
      } else {
        this.isfixed = false;
      }
    }
  }
};
</script>
