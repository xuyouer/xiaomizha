<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {LeftOutlined, HomeFilled} from '@ant-design/icons-vue'
import {computed} from "vue"

const {t} = useI18n()
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
        <h2 class="error-message">{{ t('error.notFound') }}</h2>
        <p class="error-description">{{ t('error.errorDescription') }}</p>
        <div class="error-buttons">
          <a-button
              type="primary"
              size="large"
              @click="handleGoHome"
          >
            <LeftOutlined/>
            {{ t('error.back') }}
          </a-button>
          <a-button
              size="large"
              @click="handleGoToHomePage"
          >
            <HomeFilled/>
            {{ t('error.goHome') }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>