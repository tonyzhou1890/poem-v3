<template>
  <header>
    <div class="header">
      <div class="logo">
        <router-link class="cp" :to="{ name: 'Home' }">
          <svg-icon icon-class="poem" class="iconfont icon-shici logo-icon"></svg-icon>
        </router-link>
      </div>
      <div class="search">
        <input type="text" placeholder="作者/诗歌" v-model="keyword" @keyup.enter="search" />
        <svg-icon icon-class="search" class="iconfont icon-search" @click.native="search"></svg-icon>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderMobile',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    search() {
      const query = {
        keyword: this.keyword,
        ap: 1,
        tp: 1,
        cp: 1,
        type: 'author'
        // t: new Date().getTime()
      }
      this.$router.push({ name: 'Search', query })
    },
    // 回到首页
    goHome() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";
@color: white;
header {
  width: 100%;
  height: 40px;
  background-color: @main-color;
  .header {
    max-width: 900px;
    height: 40px;
    margin: auto;
    overflow: hidden;
    font-family: "Times New Roman", Times, serif;
    position: relative;
    .logo {
      width: 40px;
      float: left;
    }
    .logo-icon {
      color: @color;
      height: 40px;
      line-height: 40px;
      font-size: 30px;
    }
    .search {
      width: calc(100% - 45px);
      line-height: 30px;
      margin-top: 5px;
      border-radius: 15px;
      background-color: @color;
      overflow: hidden;
      position: absolute;
      right: 0;
      input {
        border: none;
        outline: none;
        -webkit-appearance: none;
        width: calc(100% - 30px);
        height: 20px;
        box-sizing: border-box;
        padding: 0;
        padding-left: 10px;
      }
      i,
      .icon-search {
        cursor: pointer;
      }
    }
  }
}
</style>
