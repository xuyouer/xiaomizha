<template>
  <div class="nav-bar">
    <div class="nav-container">
      <div class="logo">
        <img :src="Base64Utils.get('xiaomizha')" alt="Logo" class="logo-img">
        <h1>{{ t('app.name') }}</h1>
      </div>
      <div class="nav-menu">
        <a-menu
            v-show="isPC"
            v-model:selectedKeys="internalSelectedKeys"
            mode="horizontal"
            :style="{ lineHeight: '64px' }"
            class="desktop-menu"
        >
          <a-menu-item key="1">
            <router-link to="/" style="color: inherit; text-decoration: none;">{{ t('nav.home') }}</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/about" style="color: inherit; text-decoration: none;">{{ t('nav.about') }}</router-link>
          </a-menu-item>
        </a-menu>
        <div v-show="isPC" class="nav-actions desktop-actions">
          <LocaleSwitcher/>
          <ThemeSwitcher/>
        </div>
        <a-button
            v-show="isMobile"
            type="text"
            class="mobile-menu-button"
            @click="toggleSidebar"
        >
          <template #icon>
            <MenuOutlined/>
          </template>
        </a-button>
      </div>
    </div>

    <div v-show="isMobile">
      <a-drawer
          v-model:open="sidebarOpen"
          placement="right"
          :title="t('menu.title')"
          @close="sidebarOpen = false"
      >
        <a-menu
            v-model:selectedKeys="internalSelectedKeys"
            mode="vertical"
        >
          <a-menu-item key="1">
            <router-link to="/" style="color: inherit; text-decoration: none;">{{ t('nav.home') }}</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/about" style="color: inherit; text-decoration: none;">{{ t('nav.about') }}</router-link>
          </a-menu-item>
        </a-menu>
        <div class="nav-actions">
          <LocaleSwitcher/>
          <ThemeSwitcher/>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, computed, onMounted, onUnmounted} from 'vue'
import {useI18n} from 'vue-i18n'
import {MenuOutlined} from '@ant-design/icons-vue'
import {Base64Utils} from "@/utils"

const {t} = useI18n()

const props = defineProps<{
  selectedKeys?: string[]
}>()

const internalSelectedKeys = ref<string[]>(props.selectedKeys || ['1'])
const sidebarOpen = ref(false)
const currentWidth = ref(window.innerWidth)

const isPC = computed(() => currentWidth.value >= 768)
const isMobile = computed(() => currentWidth.value < 768)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const handleResize = () => {
  currentWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(
    () => props.selectedKeys,
    (newValue) => {
      if (newValue) {
        internalSelectedKeys.value = newValue
      }
    }
)
</script>

<style scoped lang="scss">

</style>