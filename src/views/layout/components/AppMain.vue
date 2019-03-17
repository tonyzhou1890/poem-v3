<template>
  <div class="main-container">
    <keep-alive :include="['Home']">
      <router-view :key="key"/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="less" scoped>
.main-container {
  width: 900px;
  min-height: calc(100vh - 70px);
  margin: auto;
  padding: 10px 0;
}
@media screen and (max-width: 900px){
  .main-container {
    width: 100%;
  }
}
@media screen and (max-width: 500px){
  .main-container {
    text-align: center;
    display: block;
  }
}
</style>
