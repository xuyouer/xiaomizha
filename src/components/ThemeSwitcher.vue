<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {useThemeStore, PRIMARY_COLOR_GROUPS} from '@/stores/theme'
import type {ThemeColor} from '@/stores/theme'
import {BulbOutlined, BulbFilled} from '@ant-design/icons-vue'

const {t} = useI18n()
const themeStore = useThemeStore()

function toggleMode() {
  themeStore.toggleMode()
}

function setPrimary(color: ThemeColor) {
  themeStore.setPrimary(color.value)
}
</script>

<template>
  <a-dropdown>
    <a-button type="link" class="theme-trigger" @click.prevent>
      <BulbOutlined v-if="themeStore.mode === 'light'"/>
      <BulbFilled v-else/>
      <a-typography-text class="label">{{
          themeStore.mode === 'light' ? t('theme.light') : t('theme.dark')
        }}
      </a-typography-text>
    </a-button>
    <template #overlay>
      <a-menu class="theme-dropdown">
        <a-menu-item disabled class="group-header">
          {{ t('theme.primaryColor') }}
        </a-menu-item>
        <a-menu-item @click="toggleMode">
          <BulbOutlined v-if="themeStore.mode === 'dark'"/>
          <BulbFilled v-else/>
          {{ themeStore.mode === 'light' ? t('theme.dark') : t('theme.light') }}
        </a-menu-item>
        <a-menu-divider/>
        <template v-for="group in PRIMARY_COLOR_GROUPS" :key="group.name">
          <a-menu-item disabled class="group-header">
            {{ group.name }}
          </a-menu-item>
          <a-menu-item v-for="color in group.colors" :key="color.value" @click="setPrimary(color)">
              <span
                  class="color-dot"
                  :style="{ background: color.value }"
                  :class="{ active: themeStore.primaryColor === color.value }"
              />
            {{ color.name }}
          </a-menu-item>
          <a-menu-divider v-if="group !== PRIMARY_COLOR_GROUPS[PRIMARY_COLOR_GROUPS.length - 1]"/>
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss">

</style>
