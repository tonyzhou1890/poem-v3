<template>
  <div class="tab-container">
    <div
      v-for="(item, index) in tabs"
      :key="index"
      class="tab"
      :class="[curTab === item.value ? 'active' : '']"
      @click="clickTab(item)" >
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    tabs: {
      required: true,
      type: Array
    },
    tab: {
      type: [Number, String]
    }
  },
  data() {
    return {
      curTab: null
    }
  },
  watch: {
    tab: {
      handler(val) {
        this.curTab = val !== null && val !== undefined ? val : this.tabs[0].value
      },
      immediate: true
    }
  },
  methods: {
    clickTab(item) {
      if (this.curTab === item.value) return
      this.curTab = item.value
      this.$emit('click-tab', item)
    }
  }
}
</script>

<style lang='less' scoped>
@import '~@/styles/variables.less';
.tab-container {
  text-align: left;
    padding-top: 20px;
    >.tab {
      display: inline-block;
      width: 50px;
      height: 26px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
      border-bottom: 0px;
      &.active {
        font-weight: bold;
        border-bottom: 2px solid @main-color;
      }
    }
}

@media screen and (max-width: 900px){
  .tab-container {
    padding-top: 0px;
  }
}
</style>
