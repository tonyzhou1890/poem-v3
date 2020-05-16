<template>
  <div class="container padding-10" v-loading="loading">
    <div class="poems">
      <div class="refresh-wrapper">
        <span
          class="refresh"
          @click="handleRefresh"
          @touchend="handleRefresh"
        >换一批</span>
      </div>
      <poem :data="poems" />
    </div>
    <aside>
      <author :data="authors" />
    </aside>
  </div>
</template>

<script>
import { home, poemListRandom } from '@/api/main'
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
      Promise.all([
        home({ home: true }),
        poemListRandom()
      ])
        .then(res => {
          this.authors = res[0].data.data.authors.map(item => item.xingming)
          this.poems = res[1].data.data
        })
        .catch(e => {
          console.log(e)
        })
        .finally(e => {
          this.loading = false
        })
    },
    handleRefresh() {
      this.getHomeInfo()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';
.container {
  width: 100%;
  margin: auto;
  display: flex;
  .poems, sidebar {
    min-height: 50px;
  }
  .poems {
    flex: 7;
    margin: 0 30px 0 0;
    .refresh-wrapper {
      text-align: right;
      .refresh {
        cursor: pointer;
        color: @main-color;
        font-size: 14px;
      }
    }
  }
  aside {
    flex: 3;
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
