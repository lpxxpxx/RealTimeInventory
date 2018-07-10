<template>
  <div class="container">
    <inv-header></inv-header>
    <inv-view></inv-view>
    <inv-detail></inv-detail>
  </div>
</template>

<style scoped>
</style>

<script>
import InvHeader from './InvHeader';
import InvView from './InvView';
import InvDetail from './InvDetail';
export default {
  components: {
    InvHeader,
    InvView,
    InvDetail
  },
  data() {
    return {};
  }
};
</script>
