<template>
  <div id="article">
    <h1 class = "title">{{data.mingcheng}}</h1>
    <p class = "author cp-line">{{data.zuozhe}}</p>
    <p class = "content">{{data.yuanwen}}</p>
  </div>
</template>

<script>
import { getArticleInfo } from '@/api/main'
export default {
  name: 'Article',
  data() {
    return {
      data: {}
    }
  },
  created() {
    this.getArticleInfo()
  },
  methods: {
    getArticleInfo() {
      getArticleInfo(this.$route.query)
        .then(res => {
          this.data = res.data.data
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang = "less" scoped>
@color: #4f4f4f;
#article {
  width: 900px;
  text-align: center;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
  line-height: 2em;
  .title {
    color: @color;
    padding-top: 20px;
  }
  .author {
    font-weight: bold;
  }
  .content {
    white-space: pre-wrap;
    line-height: 30px;
  }
}
@media screen and (max-width: 900px){
  #article {
    width: 100%;
  }
}
</style>
