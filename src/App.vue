<script setup lang="ts">
import {RouterView} from 'vue-router'
import {onMounted} from 'vue'
import {useUserStore} from '@/stores/user'
import AppProvider from "@/components/AppProvider.vue"

const userStore = useUserStore()

onMounted(() => {
  // 初始化用户信息
  userStore.initUserInfo()
  // userStore.logout()
})
</script>

<template>
  <AppProvider>
    <RouterView/>
  </AppProvider>
</template>

<style>

</style>
