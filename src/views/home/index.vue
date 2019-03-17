<template>
  <div class="container" v-loading="loading">
    <div class="poems">
      <poem :data="poems" />
    </div>
    <aside>
      <author :data="authors" />
    </aside>
  </div>
</template>

<script>
import { getInfo } from '@/api/main'
import Poem from '@/components/Poem'
import Author from '@/components/Author'
export default {
  name: 'Home',
  components: {
    Poem,
    Author
  },
  data() {
    return {
      authors: [],
      poems: [],
      loading: false
    }
  },
  metaInfo() {
    return {
      title: '诗词',
      meta: [
        { name: 'description', content: '简单的诗词网站，25万首诗词任欣赏。' }
      ]
    }
  },
  created() {
    if (this.poems.length) return
    this.getHomeInfo()
  },
  methods: {
    getHomeInfo() {
      this.loading = true
      const params = {
        home: true
      }
      getInfo(params)
        .then(res => {
          this.authors = res.data.data.authors
          this.poems = res.data.data.poems
          this.loading = false
        })
        .catch(e => {
          console.log(e)
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
@bgc1: #999;
@bgc2: brown;
@bgc3: antiquewhite;
@color: white;
@border: lightgray;
.container {
  width: 100%;
  margin: auto;
  padding: 10px;
  display: flex;
  .poems, sidebar {
    min-height: 50px;
  }
  .poems {
    flex: 7;
    margin: 0 30px 0 0;
  }
  aside {
    flex: 3;
    border: 1px solid @border;
    height: 100%;
  }
}
@media screen and (max-width: 900px){
  .container {
    width: 100%;
  }
}
@media screen and (max-width: 500px){
  .container {
    text-align: center;
    display: block;
    .poems {
      margin: 0;
    }
  }
}
</style>
