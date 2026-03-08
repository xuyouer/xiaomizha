<script setup lang="ts">
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {GlobalOutlined} from '@ant-design/icons-vue'
import {setLocale, type LocaleType, SUPPORTED_LOCALES} from '@/locales'

const {t, locale} = useI18n()

const localeLabels = computed<Record<LocaleType, string>>(() => ({
  'zh-CN': t('locale.zhCN'),
  'zh-TW': t('locale.zhTW'),
  'en-US': t('locale.enUS'),
  'ru-RU': t('locale.ruRU'),
}))

function changeLocale(loc: LocaleType) {
  setLocale(loc)
}
</script>

<template>
  <a-dropdown>
    <a-button type="link" class="locale-trigger" @click.prevent>
      <GlobalOutlined/>
      <a-typography-text class="label">{{ localeLabels[locale as LocaleType] }}</a-typography-text>
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

</style>
