<template>
  <div class="container">
    <nav-bar />
    <app-main />
    <footer-bar />
  </div>
</template>

<script>
import NavBar from './components/Header.vue'
import FooterBar from './components/Footer.vue'
import AppMain from './components/AppMain.vue'
export default {
  name: 'Layout',
  components: {
    NavBar,
    FooterBar,
    AppMain
  }
}
</script>

<style>

</style>
