<template>
  <div class="subject-container padding-10" v-loading="loading">
    <section
      class="section"
      v-for="(item, index) in types"
      :key="index"
    >
      <p class="section-title">{{ item.title }}</p>
      <div class="section-content">
        <router-link
          v-for="(tag, tIndex) in data[index]"
          :key="tIndex"
          :to="{ name: 'SubjectPoem', query: { tag: tag.text, type: item.type, p: 1 }}"><span class="cp-line tag">{{ tag.text }}</span></router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { tagsByType } from '@/api/main'
import Poem from '@/components/Poem'
import Tab from '@/components/Tab'
import Pagination from '@/components/Pagination'
export default {
  name: 'Subject',
  components: {
    Poem,
    Tab,
    Pagination
  },
  data() {
    return {
      data: [],
      loading: false,
      types: [{
        type: 'fenlei',
        title: '分类'
      }, {
        type: 'chaodai',
        title: '朝代'
      }, {
        type: 'congshu',
        title: '丛书'
      }]
    }
  },
  metaInfo() {
    return {
      title: `专题`,
      meta: [
        { name: 'description', content: `品词轩-专题` }
      ]
    }
  },
  created() {
    this.getTags()
  },
  methods: {
    // 获取标签
    getTags() {
      this.loading = true
      Promise.all(this.types.map(item => {
        return tagsByType({ type: item.type })
      }))
        .then(res => {
          this.types.map((item, index) => {
            if (item.type === 'congshu') {
              res[index].data.data.map(tag => {
                tag.text = `《${tag.text}》`
              })
            }
            this.data[index] = res[index].data.data
          })
        })
        .finally(e => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';
.subject-container {
  text-align: left;
  .section {
    .section-title {
      background-color: #f7f7f7;
      border-bottom: 1px solid #e5e5e5;
      height: 36px;
      line-height: 36px;
      padding-left: 10px;
    }
    .section-content {
      line-height: 36px;
      .tag {
        padding: 0 10px;
        margin: 10px;
        display: inline-block;
        white-space: pre-wrap;
      }
    }
  }
}
</style>
