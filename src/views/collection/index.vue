<template>
  <div
    class="collection-container padding-10"
  >
    <!-- 收藏数量 -->
    <div class="collection-number">
      <p>共收藏{{ data.length }}篇</p>
    </div>
    <!-- 收藏列表 -->
    <poem
      :data="data"
      hasDelete
      @delete-item="handleDeleteItem"
    ></poem>
  </div>
</template>

<script>
import Poem from '@/components/Poem'
import localforage from 'localforage'
import { storageKeys } from '@/utils/config'
export default {
  components: {
    Poem
  },
  data() {
    return {
      data: []
    }
  },
  metaInfo() {
    return {
      title: '品词轩--收藏',
      meta: [
        { name: 'description', content: '品词轩--收藏' }
      ]
    }
  },
  created() {
    this.handleCollection()
  },
  methods: {
    // 收藏
    handleCollection(action, id) {
      localforage.getItem(storageKeys.collection)
        .then(collection => {
          collection = Array.isArray(collection) ? collection : []

          if (!action) {
            this.data = collection
          }

          // 如果是取消操作
          if (action && id) {
            let index = null
            collection.map((item, i) => {
              if (Number(item._id) === Number(id)) index = i
            })
            if (index !== null) {
              collection.splice(index, 1)
              localforage.setItem(storageKeys.collection, collection)
                .then(res => {
                  this.data = collection
                })
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 删除收藏
    handleDeleteItem(item) {
      this.handleCollection(true, item._id)
    }
  }
}
</script>

<style lang="less" scoped>
  .collection-container {
    .collection-number {
      // text-align: center;
      font-size: 18px;
      line-height: 2;
      padding-bottom: 10px;
    }
  }
</style>
