<template>
  <div class="poems-container">
    <section
      v-for="(item, index) in data"
      :key="index"
      class="poem"
      :class="hasDelete ? 'has-delete' : ''"
    >
      <router-link :to="{ name: 'Article', query: { id: item._id }}">
        <h1 class="title cp-line" v-html="item.mingcheng" />
      </router-link>
      <div
        v-if="hasDelete"
        class="delete-wrapper"
        @click="handleDelete(item)"
      >
        <svg-icon icon-class='delete' />
      </div>
      <br>
      <router-link
        v-if="!disableAuthor"
        :to="{ name: 'Author', query: { author: item.zuozhe, p: 1 }}">
        <p class="author" :class="[disableAuthor ? '' : 'cp-line']" v-html="item.zuozhe" />
      </router-link>
      <p v-if="disableAuthor" class="author" :class="[disableAuthor ? '' : 'cp-line']" v-html="item.zuozhe" />
      <br>
      <pre class="text" v-html="item.zhaiyao"></pre>
    </section>
  </div>
</template>

<script>
import SvgIcon from '../SvgIcon'
export default {
  name: 'Poem',
  components: {
    SvgIcon
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    disableAuthor: {
      type: Boolean,
      default: false
    },
    hasDelete: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickTitle(item) {
      const id = item._id
      this.$router.push({ name: 'Article', query: {id} })
    },
    clickAuthor(item) {
      if (this.disableAuthor) return
      const author = item.zuozhe
      const p = 1
      const t = new Date().getTime()
      this.$router.push({ name: 'Author', query: {author, p, t} })
    },
    handleDelete(item) {
      this.$emit('delete-item', item)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';
.poems-container {
  section {
    padding: 20px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid @border-color;
    position: relative;
    .delete-wrapper {
      position: absolute;
      right: 0;
      top: 20px;
      font-size: 20px;
      color: red;
      cursor: pointer;
    }
    .title {
      color: @main-text-color;
      display: inline-block;
    }
    .author {
      padding: 10px 0;
      font-weight: bold;
      color: @main-color;
      display: inline-block;
    }
    .text {
      color: @third-text-color;
      white-space: pre-wrap;
      font-family: "Microsoft Yahei";
      line-height: 20px;
      max-height: 100px;
      overflow: hidden;
    }
    &.has-delete {
      .title {
        max-width: calc(~'100% - 60px');
      }
    }
  }
}
</style>
