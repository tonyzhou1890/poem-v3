<template>
  <div class="author-container">
    <tab :tabs="tabs" :tab="curTab" @click-tab="clickTab" />
    <div class="poems" v-show="curTab === 1">
      <poem class="poem-list" :data="data.author" :disableAuthor="true" />
      <pagination
        :totalPage="totalPage"
        :curPage="curPage.author"
        @to-page="toPage"
        @page-change="pageChange"
        class="poem-pagination" />
    </div>
    <div class="poems" v-show="curTab === 2">
      <poem class="poem-list" :data="data.title"/>
      <pagination
        :totalPage="totalPage"
        :curPage="curPage.title"
        @to-page="toPage"
        @page-change="pageChange"
        class="poem-pagination" />
    </div>
    <div class="poems" v-show="curTab === 3">
      <poem class="poem-list" :data="data.content"/>
      <pagination
        :totalPage="totalPage"
        :curPage="curPage.content"
        @to-page="toPage"
        @page-change="pageChange"
        class="poem-pagination" />
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/main'
import Poem from '@/components/Poem'
import Tab from '@/components/Tab'
import Pagination from '@/components/Pagination'
export default {
  name: 'Search',
  components: {
    Poem,
    Tab,
    Pagination
  },
  data() {
    return {
      data: {
        author: [],
        title: [],
        content: []
      },
      limit: {
        author: null,
        title: null,
        content: null
      },
      total: {
        author: null,
        title: null,
        content: null
      },
      curPage: {
        author: Number(this.$route.query.ap),
        title: Number(this.$route.query.tp),
        content: Number(this.$route.query.cp)
      },
      type: this.$route.query.type,
      tabs: [
        {
          name: '作者',
          value: 1
        },
        {
          name: '诗词',
          value: 2
        },
        {
          name: '标题',
          value: 3
        }
      ],
      curTab: 1
    }
  },
  computed: {
    totalPage() {
      if (isNaN(Number(this.limit[this.type])) || isNaN(Number(this.total[this.type]))) return 1
      return Math.ceil(this.total[this.type] / this.limit[this.type])
    }
  },
  created() {
    const temp = this.$route.query
    switch (temp.type) {
      case 'author':
        this.curTab = 1
        break
      case 'title':
        this.curTab = 2
        break
      case 'content':
        this.curTab = 3
        break
      default:
        this.curTab = 1
    }
    this.getPoemList()
  },
  methods: {
    // 获取诗词列表
    getPoemList() {
      const query = {}
      query.keyword = this.$route.query.keyword
      query.type = this.type
      switch (query.type) {
        case 'author':
          query.p = this.curPage.author
          break
        case 'title':
          query.p = this.curPage.title
          break
        case 'content':
          query.p = this.curPage.content
          break
        default:
          query.p = this.curPage.author
          break
      }
      getInfo(query)
        .then(res => {
          const temp = res.data.data
          temp.data.map(item => {
            const keyword = this.$route.query.keyword
            const reg = new RegExp(keyword, 'g')
            switch (this.type) {
              case 'author':
                item.zuozhe = item.zuozhe.replace(reg, `<span class="highlight">${keyword}</span>`)
                break
              case 'title':
                item.mingcheng = item.mingcheng.replace(reg, `<span class="highlight">${keyword}</span>`)
                break
              case 'content':
                item.zhaiyao = item.zhaiyao.replace(reg, `<span class="highlight">${keyword}</span>`)
                break
              default:
                break
            }
          })
          this.data[this.type] = temp.data.length ? temp.data : [{zuozhe: '暂无记录'}]
          this.limit[this.type] = temp.limit
          this.total[this.type] = temp.total
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 页码加一或减一
    toPage(direction) {
      let temp = this.curPage[this.type]
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
      if (temp >= this.totalPage[this.type]) temp = this.totalPage[this.type]
      this.curPage[this.type] = temp
      this.changeRoute()
    },
    // 页码变化
    pageChange(page) {
      if (isNaN(Number(page))) return

      this.curPage[this.type] = Number(page)
    },
    // 改变路由
    changeRoute() {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      switch (this.type) {
        case 'author':
          query.ap = this.curPage[this.type]
          break
        case 'title':
          query.tp = this.curPage[this.type]
          break
        case 'content':
          query.cp = this.curPage[this.type]
          break
        default:
          query.ap = this.curPage[this.type]
          break
      }
      query.type = this.type
      query.t = new Date().getTime()
      this.$router.push({ name: 'Search', query })
    },
    // 点击tab
    clickTab(item) {
      switch (item.value) {
        case 1:
          this.type = 'author'
          break
        case 2:
          this.type = 'title'
          break
        case 3:
          this.type = 'content'
          break
        default:
          this.type = 'author'
      }
      this.changeRoute()
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
}
</style>

<style lang="less">
.author-container {
  .poem-list {
    text-align: center;
  }
}
</style>
