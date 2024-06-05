<template>
  <h1>localStorage</h1>
  <button @click="add()">添加数据</button>
  <button @click="get()">获取数据</button>
  <button @click="deleteDb()">删除数据库</button>
  <div>{{ customerData }}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
let request = window.indexedDB.open('test', 1)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let db = null
const obj = {
  name: '张三',
  age: 22,
  email: 'Zsan@foxmail.com',
  time: new Date()
}
const customerData = ref([])
request.onupgradeneeded = function (e) {
  db = e.target.result
  console.log('onupgradeneeded')
  // 通常新建数据库以后，第一件事是新建对象仓库（即新建表），并设置主键
  let objectStore;
  if (!db.objectStoreNames.contains('test')) { //如果这个 对象仓库/表 不存在，就新建
    objectStore = db.createObjectStore('person', {
      autoIncrement: true //指定主键为一个递增的整数
    });
  }
  /**
   * 新建当前数据库的索引
   * 必须在VersionChange监听函数里调用
   * objectStore.createIndex(indexName, keyPath, objectParameters)
   * indexName：索引名
   * keyPath：主键
   * objectParameters：配置对象（可选）
   * unique：如果设为 true，将不允许重复的值
   * multiEntry：如果设为 true，对于有多个值的主键数组，每个值将在索引里面新建一个条目，否则主键数组对应一个条目。
   * 
   * */
  objectStore.createIndex('name', 'name', { unique: false }) //可以重复
  objectStore.createIndex('age', 'age', { unique: false }) //可以重复
  objectStore.createIndex('email', 'email', { unique: false }) //可以重复
  objectStore.createIndex('time', 'time', { unique: true }) //不能重复
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
request.onsuccess = (event) => {
  db = event.target.result;
};
const add = () => {
  const transaction = db.transaction(['person'], 'readwrite') //写入数据需要新建一个事务。新建时必须指定表格名称和操作模式（“只读”或“读写”）
  const objectStore = transaction.objectStore('person') //新建事务以后，通过IDBTransaction.objectStore(name)方法，拿到 IDBObjectStore 对象
  obj.age = parseInt(obj.age)
  obj.time = new Date()
  const request = objectStore.add(obj) //再通过表格对象的add()方法，向表格写入一条记录
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request.onsuccess = function (e) {
    console.log('数据写入成功')
  }
  request.onerror = function (e) {
    console.log('数据写入失败:', e.srcElement.error)
  }
}

const get = () => {
  customerData.value = []
  const transaction = db.transaction(['person'])
  const objectStore = transaction.objectStore('person')
  objectStore.openCursor().onsuccess = function (e) {
    const cursor = e.target.result
    const obj2 = {
      primaryKey: 1,
      name: '',
      age: 0,
      email: '',
      time: ''
    }
    if (cursor) {
      obj2.primaryKey = cursor.key
      obj2.name = cursor.value.name
      obj2.age = cursor.value.age
      obj2.email = cursor.value.email
      obj2.time = cursor.value.time
      console.log('obj:', obj2)
      customerData.value.push(obj2)
      cursor.continue() // 递归获取
    } else {
      console.log('没有更多数据了')
    }
  }
}
const deleteDb = async () => {
  const openReq = window.indexedDB.deleteDatabase('test')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openReq.onerror = function (ev) {
    // 。。。
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openReq.onsuccess = function (ev) {
    tip.innerText = "删除数据库成功";
  };
  // const dbs = await window.indexedDB.databases()
  // dbs.forEach((db) => {
  //   window.indexedDB.deleteDatabase(db.name)
  // })
}

</script>
<style scoped lang="stylus">
</style>
