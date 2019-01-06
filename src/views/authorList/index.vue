<template>
  <div class="list">
    <author class="author-list" :data="data" />
    <pagination
      :totalPage="totalPage"
      :curPage="curPage"
      @to-page="toPage"
      @page-change="pageChange"
      class="author-pagination" />
  </div>
</template>

<script>
import { getAuthorList } from '@/api/main'
import Author from '@/components/Author'
import Pagination from '@/components/Pagination'
export default {
  name: 'AuthorList',
  components: {
    Author,
    Pagination
  },
  data() {
    return {
      data: [],
      limit: null,
      total: null,
      curPage: Number(this.$route.query.p)
    }
  },
  computed: {
    totalPage() {
      if (isNaN(Number(this.limit)) || isNaN(Number(this.total))) return 1
      return Math.ceil(this.total / this.limit)
    }
  },
  created() {
    this.getAuthorList()
  },
  methods: {
    // 获取作者列表
    getAuthorList() {
      getAuthorList(this.$route.query)
        .then(res => {
          const temp = res.data.data
          this.data = temp.data
          this.limit = temp.limit
          this.total = temp.total
        })
        .catch(e => {
          console.log(e)
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
      this.$router.push({ name: 'AuthorList', query: {author: 'all', p: this.curPage} })
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  .author-pagination {
    margin-top: 30px;
  }
}
</style>

<style lang="less">
.list {
  .author-list {
    span {
      width: 100px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

@media screen and (max-width: 900px){
  .list {
    width: 100%;
  }
}
</style>
