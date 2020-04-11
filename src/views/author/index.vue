<template>
  <div class="author-container padding-10" v-loading="loading">
    <tab :tabs="tabs" @click-tab="clickTab" />
    <div class="poems" v-show="curTab === '诗词'">
      <poem class="poem-list" :data="data" :disableAuthor="true" />
      <pagination
        :totalPage="totalPage"
        :curPage="curPage"
        :pre="pre"
        :next="next"
        @to-page="toPage"
        @page-change="pageChange"
        class="poem-pagination" />
    </div>
    <div class="author" v-show="curTab === '简介'" v-html="profile"></div>
  </div>
</template>

<script>
import { getPoemsByAuthor } from '@/api/main'
import Poem from '@/components/Poem'
import Tab from '@/components/Tab'
import Pagination from '@/components/Pagination'
export default {
  name: 'Author',
  components: {
    Poem,
    Tab,
    Pagination
  },
  data() {
    return {
      data: [],
      loading: false,
      limit: null,
      total: null,
      curPage: Number(this.$route.query.p),
      tabs: [
        {
          name: '诗词',
          value: 1
        },
        {
          name: '简介',
          value: 2
        }
      ],
      profile: '',
      curTab: '诗词'
    }
  },
  metaInfo() {
    return {
      title: `作者--${this.$route.query.author}`,
      meta: [
        { name: 'description', content: `${this.$route.query.author}的诗词` }
      ]
    }
  },
  computed: {
    totalPage() {
      if (isNaN(Number(this.limit)) || isNaN(Number(this.total))) return 1
      return Math.ceil(this.total / this.limit)
    },
    pre() {
      const temp = {}
      temp.name = 'Author'
      temp.query = JSON.parse(JSON.stringify(this.$route.query))
      temp.query.p = this.curPage - 1 < 1 ? 1 : this.curPage - 1
      return temp
    },
    next() {
      const temp = {}
      temp.name = 'Author'
      temp.query = JSON.parse(JSON.stringify(this.$route.query))
      temp.query.p = this.curPage + 1 > this.totalPage ? this.totalPage : this.curPage + 1
      return temp
    }
  },
  created() {
    this.getPoemList()
  },
  methods: {
    // 获取诗词列表
    getPoemList() {
      this.loading = true
      getPoemsByAuthor({
        author: this.$route.query.author,
        page: this.$route.query.p
      })
        .then(res => {
          const temp = res.data.data
          this.data = temp.data.length ? temp.data : [{zhaiyao: '暂无内容'}]
          this.limit = temp.limit
          this.total = temp.total
          this.profile = temp.authorInfo.jieshao || '暂无内容'
          this.loading = false
        })
        .catch(e => {
          console.log(e)
          this.loading = false
        })
    },
    // 页码加一或减一
    toPage(direction) {
      let temp = this.curPage
      switch (direction) {
        case 'pre':
          temp--
          break
        case 'next':
          temp++
          break
        case 'cur':
          break
      }
      if (temp <= 1) temp = 1
      if (temp >= this.totalPage) temp = this.totalPage
      this.curPage = temp
      this.changeRoute()
    },
    // 页码变化
    pageChange(page) {
      if (isNaN(Number(page))) return
      this.curPage = Number(page)
    },
    // 改变路由
    changeRoute() {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      query.p = this.curPage
      // query.t = new Date().getTime()
      this.$router.push({ name: 'Author', query })
    },
    // 点击tab
    clickTab(item) {
      this.curTab = item.name
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';
.author-container {
  .poem-pagination {
    margin-top: 30px;
  }
  .author {
    padding: 10px;
    box-sizing: border-box;
    border:1px solid @border;
    background-color: @bgc3;
    white-space: pre-line;
  }
}
</style>

<style lang="less">
.author-container {
  .poem-list {
    text-align: center;
  }
}
</style>
