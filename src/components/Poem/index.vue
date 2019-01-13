<template>
  <div class="poems-container">
    <section
      v-for="(item, index) in data"
      :key="index"
      class="poem">
      <h1 class="title cp-line" v-html="item.mingcheng" @click="clickTitle(item)" /><br>
      <p class="author" :class="[disableAuthor ? '' : 'cp-line']" v-html="item.zuozhe" @click="clickAuthor(item)" /><br>
      <pre class="text" v-html="item.zhaiyao"></pre>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    disableAuthor: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickTitle(item) {
      const id = item._id
      this.$router.push({ name: 'Article', query: {id} })
    },
    clickAuthor(item) {
      if (this.disableAuthor) return
      const author = item.zuozhe
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
@color2: #4f4f4f;
@border: lightgray;
.poems-container {
  section {
    padding: 10px;
    box-sizing: border-box;
    border:1px solid @border;
    margin: 0 0 30px 0;
    background-color: @bgc3;
    .title {
      color: @color2;
      display: inline-block;
    }
    .author {
      padding: 10px 0;
      font-weight: bold;
      display: inline-block;
    }
    .text {
      white-space: pre-wrap;
      font-family: "Microsoft Yahei";
      line-height: 20px;
      max-height: 100px;
      overflow: hidden;
    }
  }
}

@media screen and (max-width: 500px){
  .poems-container {
    section {
      margin: 0 0 15px 0;
    }
  }
}
</style>
