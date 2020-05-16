<template>
  <div class="subject-poem-container padding-10" v-loading="loading">
    <poem class="poem-list" :data="data" />
    <pagination
      :totalPage="totalPage"
      :curPage="curPage"
      :pre="pre"
      :next="next"
      @to-page="toPage"
      @page-change="pageChange"
      class="poem-pagination" />
  </div>
</template>

<script>
import { poemListByTag } from '@/api/main'
import Poem from '@/components/Poem'
import Pagination from '@/components/Pagination'
export default {
  name: 'SubjectPoem',
  components: {
    Poem,
    Pagination
  },
  data() {
    return {
      data: [],
      loading: false,
      limit: null,
      total: null,
      curPage: Number(this.$route.query.p)
    }
  },
  metaInfo() {
    return {
      title: `专题--${this.$route.query.tag}`,
      meta: [
        { name: 'description', content: `${this.$route.query.tag}相关诗词` }
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
      temp.name = 'SubjectPoem'
      temp.query = JSON.parse(JSON.stringify(this.$route.query))
      temp.query.p = this.curPage - 1 < 1 ? 1 : this.curPage - 1
      return temp
    },
    next() {
      const temp = {}
      temp.name = 'SubjectPoem'
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
      poemListByTag({
        tag: this.$route.query.type === 'congshu' ? this.$route.query.tag.replace(/[《》]/g, '') : this.$route.query.tag,
        field: this.$route.query.type,
        page: this.$route.query.p
      })
        .then(res => {
          const temp = res.data
          this.data = temp.data
          this.limit = temp.limit
          this.total = temp.total
          this.loading = false
        })
        .catch(e => {
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
      this.$router.push({ name: 'SubjectPoem', query })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';
.subject-poem-container {
  .poem-pagination {
    margin-top: 30px;
  }
}
</style>

<style lang="less">
.subject-poem-container {
  .poem-list {
    text-align: center;
  }
}
</style>
