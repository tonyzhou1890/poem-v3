<template>
  <div class="pagination">
    <router-link v-if="hasPre" :to="pre">
      <span
        :class="[buttonClass,hasPre ? '' : 'disabled']" >&lt;</span>
    </router-link>
    <span
      v-if="!hasPre"
      :class="[buttonClass,hasPre ? '' : 'disabled']" >&lt;</span>
    <input
      type="number"
      :value="curPage"
      @change="pageChange"
      @keyup.enter="page('cur')"
      min="1"
      :max="total">
    <span>/{{total}}</span>
    <router-link v-if="hasNext" :to="next">
      <span
        :class="[buttonClass,hasNext ? '' : 'disabled']" >&gt;</span>
    </router-link>
    <span
      v-if="!hasNext"
      :class="[buttonClass,hasNext ? '' : 'disabled']" >&gt;</span>
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
    },
    pre: {
      type: Object,
      default() {
        return {}
      }
    },
    next: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      buttonClass: 'button',
      tempCurPage: null
    }
  },
  computed: {
    total() {
      return isNaN(this.totalPage) ? 1 : this.totalPage
    },
    hasPre() {
      return this.curPage > 1 && this.totalPage > 1
    },
    hasNext() {
      return this.curPage < this.totalPage
    }
  },
  methods: {
    page: function(direction) {
      if (isNaN(Number(direction)) && direction !== 'next' && direction !== 'pre' && direction !== 'cur') {
        return
      }
      if (direction === 'next' && this.curPage >= this.total) return
      if (direction === 'pre' && this.curPage <= 1) return
      if (direction === 'cur' && this.$route.query.p === this.curPage) return
      this.$emit('to-page', direction)
    },
    pageChange(e) {
      if (this.curPage === this.total && e.target.value >= this.curPage) return
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
    height: 26px;
    line-height: 26px;
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
    width: 26px;
    line-height: 22px;
    border-radius: 50%;
    background-color: @bgc;
    border: 1px solid @border;
  }
  .disabled {
    cursor: not-allowed;
    background-color: @bgc2;
  }
}
</style>
