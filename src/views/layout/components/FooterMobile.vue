<template>
  <footer>
    <div
      v-for="(item, index) in tabList"
      :key="index"
      class="tab-item"
      :class="activePath === item.path && 'active'"
    >
      <router-link
        v-if="activePath !== item.path"
        :to="item.router"
      >{{ item.text }}</router-link>
      <span v-else>{{ item.text }}</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterMobile',
  props: {
    tabList: Array
  },
  computed: {
    activePath() {
      return this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 16px;
  line-height: 40px;
  color: @main-text-color;
  border-top: 1px solid @main-color;
  box-sizing: border-box;
  display: flex;
  .tab-item {
    flex: 1;
    &.active {
      font-weight: bold;
      background-color: @main-color;
      color: white;
    }
  }
}
</style>
