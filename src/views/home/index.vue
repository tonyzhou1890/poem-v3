<template>
  <div class="container">
    <div class="poems">
      <poem :data="poems" />
    </div>
    <aside>
      <author :data="authors" />
    </aside>
  </div>
</template>

<script>
import { getHome } from '@/api/main'
import Poem from '@/components/Poem'
import Author from '@/components/Author'
export default {
  name: 'Home',
  components: {
    Poem,
    Author
  },
  data() {
    return {
      authors: [],
      poems: []
    }
  },
  created() {
    if (this.poems.length) return
    this.getHomeInfo()
  },
  methods: {
    getHomeInfo() {
      const params = {
        home: true
      }
      getHome(params)
        .then(res => {
          this.authors = res.data.data.authors
          this.poems = res.data.data.poems
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@bgc1: #999;
@bgc2: brown;
@bgc3: antiquewhite;
@color: white;
@border: lightgray;
.container {
  width: 100%;
  margin: auto;
  padding: 10px;
  display: flex;
  .poems, sidebar {
    min-height: 50px;
  }
  .poems {
    flex: 7;
    margin: 0 30px 0 0;
  }
  aside {
    flex: 3;
    border: 1px solid @border;
    height: 100%;
  }
}
@media screen and (max-width: 900px){
  .container {
    width: 100%;
  }
}
@media screen and (max-width: 500px){
  .container {
    text-align: center;
    display: block;
    .poems {
      margin: 0;
    }
  }
}
</style>
