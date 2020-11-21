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
      loading: false,
      useCache: true // 是否尝试使用/存储缓存
    }
  },
  metaInfo() {
    return {
      title: '品词轩',
      meta: [
        { name: 'description', content: '在古典中寻得一方宁静。' }
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
      // 请求列表
      const reqList = [
        home({ home: true })
      ]
      // 如果有缓存，使用缓存
      if (window.cache && window.cache.homeListStr && this.useCache) {
        this.poems = window.cache.homeListStr
        window.cache = null
        const cacheScript = document.getElementById('cache-script')
        cacheScript.innerHTML = ''
        this.useCache = false
      } else {
        reqList.push(poemListRandom())
      }
      Promise.all(reqList)
        .then(res => {
          this.authors = res[0].data.data.authors.map(item => item.xingming)
          if (res[1]) {
            this.poems = res[1].data.data
            if (this.useCache) {
              // 加入缓存
              const el = document.createElement('script')
              el.setAttribute('id', 'cache-script')
              el.innerHTML = `
                window.cache = {
                  homeListStr: ${JSON.stringify(res[1].data.data)}
                }
              `
              document.head.appendChild(el)
            }
            this.useCache = false
          }
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
