<script setup lang="ts">
import { computed } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import { theme } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
const { locale } = useI18n()
const themeStore = useThemeStore()

const antdLocale = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS))

const themeConfig = computed(() => ({
  token: {
    colorPrimary: themeStore.primaryColor,
  },
  algorithm:
      themeStore.mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
}))
</script>

<template>
  <ConfigProvider :locale="antdLocale" :theme="themeConfig">
    <slot></slot>
  </ConfigProvider>
</template>
