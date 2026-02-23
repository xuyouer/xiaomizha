<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { LeftOutlined, HomeFilled } from '@ant-design/icons-vue';
import {computed} from "vue";

const router = useRouter()
const route = useRoute()

const hasBack = computed(() => window.history.length > 1)
const handleGoHome = () => {
  const redirect = route.query.redirect as string | undefined
  redirect ? router.push(redirect) : hasBack.value ? router.back() : router.push('/')
}
const handleGoToHomePage = () => {
  router.push('/')
}
</script>

<template>
  <div class="error-404">
    <div class="error-container">
      <div class="error-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-message">页面不存在</h2>
        <p class="error-description">抱歉，您访问的页面可能已被删除、移动或输入了错误的地址。</p>
        <div class="error-buttons">
          <a-button
              type="primary"
              size="large"
              @click="handleGoHome"
          >
            <LeftOutlined />
            返回
          </a-button>
          <a-button
              size="large"
              @click="handleGoToHomePage"
          >
            <HomeFilled />
            回到首页
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>