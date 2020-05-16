<template>
  <div id="app">
    <nav-bar v-if="!isMobile" />
    <nav-bar-mobile v-else />
    <app-main
      :class="[
        isMobile ? 'is-mobile' : '',
        isTabPage ? 'is-tab-page' : ''
      ]"
    />
    <footer-bar v-if="!isMobile" />
    <footer-bar-mobile
      v-if="isMobile && isTabPage"
      :tabList="tabList"
    ></footer-bar-mobile>
  </div>
</template>

<script>
import NavBar from './views/layout/components/Header.vue'
import NavBarMobile from './views/layout/components/HeaderMobile.vue'
import FooterBar from './views/layout/components/Footer.vue'
import FooterBarMobile from './views/layout/components/FooterMobile.vue'
import AppMain from './views/layout/components/AppMain.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    NavBarMobile,
    FooterBar,
    FooterBarMobile,
    AppMain
  },
  data() {
    return {
      tabList: [
        {
          path: '/',
          text: '首页',
          router: { name: 'Home' }
        },
        {
          path: '/poemList',
          text: '诗词',
          router: { name: 'PoemList', query: {poem: 'all', p: 1} }
        },
        {
          path: '/authorList',
          text: '作者',
          router: { name: 'AuthorList', query: {poem: 'all', p: 1} }
        },
        {
          path: '/subject',
          text: '专题',
          router: { name: 'Subject' }
        },
        {
          path: '/collection',
          text: '收藏',
          router: { name: 'Collection' }
        }
      ]
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.device === 'mobile'
    },
    isTabPage() {
      return this.tabList.find(item => item.path === this.$route.path)
    }
  },
  created() {
    this.setDevice()
    window.addEventListener('resize', this.setDevice)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setDevice)
  },
  methods: {
    setDevice() {
      const isMobile = document.body.clientWidth <= 500
      this.$store.commit('toggleDevice', isMobile ? 'mobile' : 'desktop')
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";
#app {
  color: @main-text-color;
  width: 100%;
  height: 100%;
  .is-mobile {
    height: calc(100% - 42px);
    min-height: auto;
    overflow: auto;
    padding: 0;
    &.is-tab-page {
      height: calc(100% - 82px);
    }
  }
}
</style>
