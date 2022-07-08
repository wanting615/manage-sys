
<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { getUserInfo } from "@/api/login";
const store= useStore();
const token = localStorage.getItem('token');
if(token)  {
  store.commit('setIslogin',true);
  store.commit('setToken', token);
  getUserInfo().then(res => {
    if(!res.status) { 
      localStorage.removeItem('token');
       store.commit('setIslogin',false);
        store.commit('setToken', '');
    }
  })
}
</script>

<style lang="scss">
@import "./App.scss";
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 900px;
}
@import "./theme/mobile.scss"
</style>
