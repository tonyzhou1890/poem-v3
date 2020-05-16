<template>
  <div class="article-container padding-10" v-loading="loading">
    <div class="collection">
      <span
        @click="handleCollection(true)"
      >
        <svg-icon
          iconClass="collection"
          :className="isCollected ? 'active' : ''"
        />
      </span>
    </div>
    <h1 class = "title">{{data.mingcheng}}</h1>
    <p class = "author">{{data.zuozhe}}</p>
    <p class = "content">{{data.yuanwen}}</p>
  </div>
</template>

<script>
import { getById } from '@/api/main'
import localforage from 'localforage'
import { storageKeys } from '@/utils/config'
import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'Article',
  components: {
    SvgIcon
  },
  data() {
    return {
      data: {},
      loading: false,
      isCollected: false
    }
  },
  metaInfo() {
    return {
      title: this.data.mingcheng,
      meta: [
        { name: 'description', content: `《${this.data.mingcheng}》的内容` }
      ]
    }
  },
  created() {
    this.getArticleInfo()
    this.handleCollection()
  },
  methods: {
    getArticleInfo() {
      this.loading = true
      getById(this.$route.query)
        .then(res => {
          this.data = res.data.data
          this.loading = false
        })
        .catch(e => {
          console.log(e)
          this.loading = false
        })
    },
    // 是否收藏
    handleCollection(action) {
      localforage.getItem(storageKeys.collection)
        .then(collection => {
          collection = Array.isArray(collection) ? collection : []

          if (collection.find(item => Number(item._id) === Number(this.$route.query.id))) {
            this.isCollected = true
          } else {
            this.isCollected = false
          }

          // 如果是收藏/取消操作
          if (action) {
            if (this.isCollected) {
              let index = null
              collection.map((item, i) => {
                if (Number(item._id) === Number(this.$route.query.id)) index = i
              })
              collection.splice(index, 1)
            } else {
              collection.unshift({
                ...this.data,
                yuanwen: undefined
              })
            }
            localforage.setItem(storageKeys.collection, collection)
              .then(res => {
                this.isCollected = !this.isCollected
              })
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang = "less" scoped>
@import '~@/styles/variables.less';
.article-container {
  width: 900px;
  text-align: center;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
  line-height: 2em;
  .collection {
    font-size: 20px;
    text-align: right;
    color: lightgray;
    svg {
      cursor: pointer;
    }
  }
  .title {
    color: @main-text-color;
    padding-top: 20px;
    font-weight: normal;
  }
  .author {
    color: @main-color;
    font-weight: bold;
  }
  .content {
    color: @third-text-color;
    white-space: pre-wrap;
    line-height: 30px;
  }
}
@media screen and (max-width: 900px){
  .article-container {
    width: 100%;
  }
}
</style>

<style lang="less">
.article-container {
  .collection {
    .active {
      color: red;
    }
  }
}
</style>
