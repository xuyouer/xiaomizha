<template>
  <div class="footer">
    <div class="footer-content">
      <p>© 2020-{{ new Date().getFullYear() }} {{ t('app.copyright') }}</p>
      <div class="footer-links">
        <a-button type="link">{{ t('app.userAgreement') }}</a-button>
        <a-button type="link">{{ t('app.privacyPolicy') }}</a-button>
        <a-button type="link">{{ t('app.contactUs') }}</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped lang="scss">
.footer {
  background: var(--header-footer-bg);
  border-top: 1px solid var(--border-color);
  padding: 24px 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0;
    color: var(--text-muted);
    font-size: 14px;
  }

  .footer-links {
    display: flex;
    gap: 16px;

    button {
      color: var(--text-muted);
      font-size: 14px;
      text-decoration: none;
      height: initial;
      padding: initial;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 12px;
    text-align: center;

    .footer-links {
      justify-content: center;
    }
  }
}
</style>