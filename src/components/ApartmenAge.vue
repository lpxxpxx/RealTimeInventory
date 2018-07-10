<template>
  <div class="apart">
    <div :class="{ fixedtab: isfixed }" ref="tabbox">
      <tab :line-width="2" active-color='#5077a9' v-model="index">
        <tab-item active-class="activeon" @on-item-click="clickHandler" :selected="initItem === item.name" v-for="(item, index) in age" @click="initItem = item.name" :key="index">{{item.name}}</tab-item>
      </tab>
    </div>
    <div ref="listbox" :class="{ marginTop: isfixed }">
      <div class="databox" v-for="(item, index) in age" :key="index">
        <h1>{{ item.name }}</h1>
        <div class="db-item">
          <div class="it-pro">
            <x-progress :percent="60" :show-cancel="false" class="it1"></x-progress>
          </div>
          <p>平均库龄<span>{{ item.average }}<em>&nbsp;天</em></span></p>
        </div>
        <div class="db-item">
          <div class="it-pro">
            <x-progress :percent="76" :show-cancel="false" class="it2"></x-progress>
          </div>
          <p>30-90<span>{{ item.date30 }}</span></p>
        </div>
        <div class="db-item">
          <div class="it-pro">
            <x-progress :percent="36" :show-cancel="false" class="it3"></x-progress>
          </div>
          <p>90-150<span>{{ item.date90 }}</span></p>
        </div>
        <div class="db-item">
          <div class="it-pro">
            <x-progress :percent="26" :show-cancel="false" class="it4"></x-progress>
          </div>
          <p>150+<span>{{ item.date150 }}</span></p>
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
      initItem: '品牌一部',
      scroll: '',
      index: 0,
      isfixed: false,
      tabOffsetTop1: 10,
      age: [
        {
          name: '品牌一部',
          average: 325,
          date30: 98797,
          date90: 154878,
          date150: 24848
        },
        {
          name: '品牌二部',
          average: 264,
          date30: 1545,
          date90: 1423,
          date150: 987
        },
        {
          name: '品牌三部',
          average: 200,
          date30: 1544,
          date90: 36477,
          date150: 265654
        },
        {
          name: '品牌四部',
          average: 168,
          date30: 26596549,
          date90: 546544,
          date150: 36549494
        },
        {
          name: '品牌五部',
          average: 92,
          date30: 6549,
          date90: 5848,
          date150: 3654
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrolling);
    this.tabOffsetTop1 = 272;
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
      if (this.scroll > this.tabOffsetTop1) {
        this.isfixed = true;
      } else {
        this.isfixed = false;
      }
    }
  }
};
</script>
