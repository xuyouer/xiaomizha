<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { GlobalOutlined } from '@ant-design/icons-vue'
import { setLocale, type LocaleType, SUPPORTED_LOCALES } from '@/locales'

const { t, locale } = useI18n()

const localeLabels = computed<Record<LocaleType, string>>(() => ({
  'zh-CN': t('locale.zhCN'),
  'en-US': t('locale.enUS'),
}))

function changeLocale(loc: LocaleType) {
  setLocale(loc)
}
</script>

<template>
  <a-dropdown>
    <a-button type="link" class="locale-trigger" @click.prevent>
      <GlobalOutlined />
      <span class="label">{{ localeLabels[locale as LocaleType] }}</span>
    </a-button>
    <template #overlay>
      <a-menu>
        <a-menu-item
            v-for="loc in SUPPORTED_LOCALES"
            :key="loc"
            @click="changeLocale(loc)"
        >
          {{ localeLabels[loc] }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss">
.locale-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
}
.locale-trigger:hover {
  background: rgba(0, 0, 0, 0.04);
}
[data-theme='dark'] .locale-trigger:hover {
  background: rgba(255, 255, 255, 0.08);
}
.label {
  font-size: 14px;
}
</style>
