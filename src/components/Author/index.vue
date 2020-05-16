<template>
  <div id="authors">
    <router-link
      v-for="(author, index) in data"
      :key="index"
      :to="{ name: 'Author', query: { author, p: 1 }}"><span class="cp-line">{{author}}</span></router-link>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    clickAuthor(item) {
      const author = item
      const p = 1
      const t = new Date().getTime()
      this.$router.push({ name: 'Author', query: {author, p, t} })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';
@bgc1: #999;
@bgc2: brown;
@bgc3: antiquewhite;
@color: white;
@color2: black;
@border: white;
  span {
    display: inline-block;
    padding: 3px;
    margin: 4px;
    color: @third-text-color;
  }
</style>
