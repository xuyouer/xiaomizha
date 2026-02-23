<template>
  <div class="nav-bar">
    <div class="nav-container">
      <div class="logo">
        <h1>{{ t('app.name') }}</h1>
      </div>
      <div class="nav-menu">
        <a-menu
          v-model:selectedKeys="internalSelectedKeys"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            <router-link to="/" style="color: inherit; text-decoration: none;">{{ t('nav.home') }}</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/about" style="color: inherit; text-decoration: none;">{{ t('nav.about') }}</router-link>
          </a-menu-item>
        </a-menu>
        <div class="nav-actions">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  selectedKeys?: string[]
}>()

const internalSelectedKeys = ref<string[]>(props.selectedKeys || ['1'])

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
.nav-bar {
  background: var(--header-footer-bg);
  box-shadow: 0 2px 8px var(--shadow-color);
  position: sticky;
  top: 0;
  z-index: 100;

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 64px;

    .logo h1 {
      margin: 0;
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 600;
    }

    .nav-menu {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;

      > * {
        background: initial;
        border-bottom: initial;
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px;
  }
}
</style>