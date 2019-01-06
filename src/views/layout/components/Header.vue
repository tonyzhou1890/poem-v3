<template>
  <header>
    <div class="header">
      <div class = "logo">
        <a class="cp" @click="goHome"><svg-icon icon-class="poem" class = "iconfont icon-shici logo-icon"></svg-icon></a>
      </div>
      <div class = "category">
        <a class="cp" @click="goPoemList"><p>诗词</p></a>
        <a class="cp" @click="goAuthorList"><p>作者</p></a>
      </div>
      <div class = "search"><input type="text" placeholder="作者/诗歌" v-model="keyword" @keyup.enter="search"><svg-icon icon-class="search" class = "iconfont icon-search" @click="search"></svg-icon></div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    search() {
      console.log(this.keyword)
    },
    // 回到首页
    goHome() {
      this.$router.push({ name: 'Home' })
    },
    // 去作者列表
    goAuthorList() {
      this.$router.push({ name: 'AuthorList', query: {author: 'all', p: 1} })
    },
    // 去诗词列表
    goPoemList() {
      this.$router.push({ name: 'PoemList', query: {poem: 'all', p: 1} })
    }
  }
}
</script>

<style lang="less">
@bgc1: #999;
@bgc2: brown;
@bgc3: antiquewhite;
@color: white;
@border: lightgray;
header {
  width: 100%;
  height: 40px;
  background-color: @bgc2;
  .header {
      width: 900px;
      height: 40px;
      margin: auto;
      overflow: hidden;
      font-family: 'Times New Roman', Times, serif;
      position: relative;
      >div {
        float: left;
      }
      .logo-icon {
        color: @color;
        height: 40px;
        line-height: 40px;
        font-size: 30px;
      }
      .category {
        margin-left: 100px;

        p {
          display: inline-block;
          font-size: 20px;
          line-height: 40px;
          color: @color;
          margin: 0 20px;
        }
      }
      .search {
        position: absolute;
        right: 0;
        line-height: 30px;
        width: 200px;
        margin-top: 5px;
        border-radius: 15px;
        background-color: @color;
        overflow: hidden;
        input {
          border: none;
          outline: none;
          -webkit-appearance: none;
          width: 170px;
          height: 20px;
          box-sizing: border-box;
          padding: 0;
          padding-left: 10px;
        }
        i {
          cursor: pointer;
        }
      }
    }
}
@media screen and (max-width: 900px){
  header {
    .header {
      width: 100%;
    }
  }
}
@media screen and (max-width: 500px){
  header {
    .header {
      .category {
        margin-left: 50px;
        p {
          margin: 0 10px;
        }
      }
    }
  }
}
@media screen and (max-width: 412px){
  header {
    .header {
      .category {
        margin-left: 10px;
        p {
          margin: 0 3px;
          font-size: 18px;
        }
      }
    }
  }
}
@media screen and (max-width: 320px){
  header {
    .header {
      .search {
        width: 160px;
        input {
          width: 130px;
        }
      }
    }
  }
}
</style>
