<template>
  <div class="footer">
    <div class="footer-content">
      <p>© 2020-{{ new Date().getFullYear() }} {{ t('app.copyright') }}</p>
      <div class="footer-links" :class="{ 'non-zh': !isZhLocale }">
        <a-button type="link">{{ t('app.userAgreement') }}</a-button>
        <a-button type="link">{{ t('app.privacyPolicy') }}</a-button>
        <a-button type="link">{{ t('app.contactUs') }}</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue"
import {useI18n} from 'vue-i18n'
import {isZhLocale as isZhLocaleFunc} from "@/locales"

const {t, locale} = useI18n()
const isZhLocale = computed(() => {
  locale.value
  return isZhLocaleFunc()
})
</script>

<style scoped lang="scss">

</style>