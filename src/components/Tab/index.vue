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
@bgc: antiquewhite;
@border: white;
@border2: lightgray;
.tab-container {
  text-align: left;
    padding-top: 20px;
    >.tab {
      display: inline-block;
      width: 50px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background-color: @bgc;
      cursor: pointer;
      border: 1px solid @border;
      border-bottom: 0px;
      &.active {
        width: 56px;
        height: 24px;
        font-size: 20px;
        line-height: 24px;
        border-color: @border2;
      }
    }
}

@media screen and (max-width: 900px){
  .tab-container {
    padding-top: 0px;
  }
}
</style>
