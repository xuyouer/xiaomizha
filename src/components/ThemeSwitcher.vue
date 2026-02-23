<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useThemeStore, PRIMARY_COLORS } from '@/stores/theme'
import type { ThemeColor } from '@/stores/theme'
import { BulbOutlined, BulbFilled } from '@ant-design/icons-vue'

const { t } = useI18n()
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
      <BulbOutlined v-if="themeStore.mode === 'light'" />
      <BulbFilled v-else />
      <span class="label">{{ themeStore.mode === 'light' ? t('theme.light') : t('theme.dark') }}</span>
    </a-button>
    <template #overlay>
      <a-menu>
        <a-menu-item @click="toggleMode">
          {{ themeStore.mode === 'light' ? t('theme.dark') : t('theme.light') }}
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item disabled>
          <span class="color-label">{{ t('theme.primaryColor') }}</span>
        </a-menu-item>
        <a-menu-item v-for="color in PRIMARY_COLORS" :key="color.value" @click="setPrimary(color)">
          <span
              class="color-dot"
              :style="{ background: color.value }"
              :class="{ active: themeStore.primaryColor === color.value }"
          />
          {{ color.name }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss">
.theme-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
}
.theme-trigger:hover {
  background: rgba(0, 0, 0, 0.04);
}
[data-theme='dark'] .theme-trigger:hover {
  background: rgba(255, 255, 255, 0.08);
}
.label {
  font-size: 14px;
}
.color-label {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
[data-theme='dark'] .color-label {
  color: rgba(255, 255, 255, 0.45);
}
:deep(.ant-dropdown-menu-title-content) {
  display: flex;
  align-items: center;
}
.color-dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
  border: 2px solid transparent;
}
.color-dot.active {
  border-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}
[data-theme='dark'] .color-dot.active {
  border-color: rgba(255, 255, 255, 0.5);
}
</style>
