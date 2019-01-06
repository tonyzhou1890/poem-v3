<template>
  <div class="pagination">
    <span
      :class = "[buttonClass,totalPage <= 1 ? '' : readyClass]"
      @click="page('pre')">&lt;</span>
    <input
      type="number"
      :value="curPage"
      @change="pageChange"
      @keyup.enter="page('cur')"
      min="1"
      :max="totalPage">
    <span>/{{totalPage}}</span>
    <span
      :class = "[buttonClass,curPage >= totalPage ? '' : readyClass]"
      @click="page('next')">&gt;</span>
  </div>
</template>

<script>
export default {
  props: {
    totalPage: {
      type: Number,
      required: true
    },
    curPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      buttonClass: 'button',
      readyClass: 'ready',
      tempCurPage: null
    }
  },
  computed: {},
  methods: {
    page: function(direction) {
      if (isNaN(Number(direction)) && direction !== 'next' && direction !== 'pre' && direction !== 'cur') {
        return
      }
      this.$emit('to-page', direction)
    },
    pageChange(e) {
      this.$emit('page-change', e.target.value)
    }
  }
}
</script>

<style lang="less" >
@bgc: #eee;
@bgc2: #ddd;
@border: lightgray;
.pagination {
  font-size: 16px;
  padding-bottom: 30px;
  text-align: center;
  * {
    display: inline-block;
    height: 34px;
    line-height: 30px;
    box-sizing: border-box;
    vertical-align: bottom;
    user-select: none;
  }
  input {
    // width: 40px;
    padding-bottom: 0px;
    text-align: center;
  }
  .button {
    cursor: pointer;
    width: 80px;
    background-color: @bgc;
    border: 1px solid @border;
  }
  .ready:hover {
    background-color: @bgc2;
  }
}
</style>
