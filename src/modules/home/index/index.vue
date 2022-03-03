<template>
  <h1>home</h1>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'


import { layout } from './variable'
import {  } from './method'

onMounted(() => {
  // training()
})
defineProps({
  msg: String
})

</script>

<style scoped lang="stylus"></style>
