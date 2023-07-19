
<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getUserInfo } from './api/login';
import { useStore } from './store';

const token = localStorage.getItem('token');
const store = useStore();
const router = useRouter();
if (token) {
  store.commit('setToken', token);
  getUserInfo(token).then(res => {
    if (res.status) {
      store.commit('setIslogin', true);
      store.commit('setUserInfo', res.data);
    } else {
      store.commit('setToken', '');
      localStorage.removeItem('token')
      router.push('/home')
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
