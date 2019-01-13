<template>
  <div id="authors">
    <a
       v-for="(author, index) in data"
       :key="index"><span class="cp-line" @click="clickAuthor(author)">{{author}}</span></a>
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
@bgc1: #999;
@bgc2: brown;
@bgc3: antiquewhite;
@color: white;
@color2: black;
@border: white;
  span {
    display: inline-block;
    background-color: @bgc3;
    padding: 3px;
    margin: 4px;
    color: @color2;
    border: 1px solid @border;
  }
</style>
