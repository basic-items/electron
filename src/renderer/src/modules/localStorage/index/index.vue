<template>
  <h1>localStorage</h1>
  <button @click="add()">添加数据</button>
  <button @click="get()">获取数据</button>
  <div>{{ userInfo }}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import webdb from '@stroll/db'
const db = new webdb.Db('test', '0.0.1', {
  col1: {
    index1: true
  },
  col3: true
})
console.log('db', db)
let name = 1
const userInfo = ref([])
function add() {
  name = `${name} - 1`
  
}

function get() {
  userInfo.value.push(name)
}

</script>
<style scoped lang="stylus">
</style>
