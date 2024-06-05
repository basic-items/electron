<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <p></p>
  <router-link :to="{ path: '/' }" >首页</router-link>
  &nbsp;&nbsp;&nbsp;
  <router-link :to="{ path: '/overview' }" >概览</router-link>
  &nbsp;&nbsp;&nbsp;
  <router-link :to="{ path: '/localStorage' }" >本地存储</router-link>
  <router-view></router-view>
  <div id="cnbi-viewport"></div></div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
