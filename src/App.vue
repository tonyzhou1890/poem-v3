<template>
  <div id="app">
    <nav-bar />
    <app-main />
    <footer-bar />
  </div>
</template>

<script>
import NavBar from './views/layout/components/Header.vue'
import FooterBar from './views/layout/components/Footer.vue'
import AppMain from './views/layout/components/AppMain.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    FooterBar,
    AppMain
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
