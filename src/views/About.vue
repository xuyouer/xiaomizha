<template>
  <div class="about-container">
    <Header :selected-keys="selectedKeys"/>

    <div class="main-content">
      <div class="content-container">
        <div class="about-card">
          <div class="card-header">
            <h2>{{ t('about.aboutProject') }}</h2>
          </div>
          <div class="card-content">
            <div class="project-info">
              <a-descriptions :title="t('about.projectInfo')" bordered :column="1">
                <a-descriptions-item :label="t('about.projectName')">小咪楂 (xiaomizha)</a-descriptions-item>
                <a-descriptions-item :label="t('about.techStack')">
                  <a-tag color="blue">Vue 3</a-tag>
                  <a-tag color="green">TypeScript</a-tag>
                  <a-tag color="orange">Vite</a-tag>
                  <a-tag color="purple">Ant Design Vue</a-tag>
                </a-descriptions-item>
                <a-descriptions-item :label="t('about.buildTool')">Vite</a-descriptions-item>
                <a-descriptions-item :label="t('about.uiLibrary')">Ant Design Vue</a-descriptions-item>
                <a-descriptions-item :label="t('about.router')">Vue Router</a-descriptions-item>
              </a-descriptions>
            </div>

            <a-divider/>

            <div class="tech-info">
              <h3>{{ t('about.techDescription') }}</h3>
              <a-timeline>
                <a-timeline-item color="green">
                  <p>{{ t('about.viteDesc') }}</p>
                </a-timeline-item>
                <a-timeline-item color="blue">
                  <p>{{ t('about.vueDesc') }}</p>
                </a-timeline-item>
                <a-timeline-item color="purple">
                  <p>{{ t('about.tsDesc') }}</p>
                </a-timeline-item>
                <a-timeline-item color="orange">
                  <p>{{ t('about.antDesc') }}</p>
                </a-timeline-item>
              </a-timeline>
            </div>

            <div class="features-section">
              <h3>{{ t('about.features') }}</h3>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">
                    <CodeOutlined style="font-size: 24px; color: #1890ff;"/>
                  </div>
                  <div class="feature-content">
                    <h4>{{ t('about.modernDev') }}</h4>
                    <p>{{ t('about.modernDevDesc') }}</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">
                    <RocketOutlined style="font-size: 24px; color: #52c41a;"/>
                  </div>
                  <div class="feature-content">
                    <h4>{{ t('about.fastBuild') }}</h4>
                    <p>{{ t('about.fastBuildDesc') }}</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">
                    <LayoutOutlined style="font-size: 24px; color: #faad14;"/>
                  </div>
                  <div class="feature-content">
                    <h4>{{ t('about.beautifulUi') }}</h4>
                    <p>{{ t('about.beautifulUiDesc') }}</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">
                    <SecurityScanOutlined style="font-size: 24px; color: #f5222d;"/>
                  </div>
                  <div class="feature-content">
                    <h4>{{ t('about.secure') }}</h4>
                    <p>{{ t('about.secureDesc') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {
  CodeOutlined,
  RocketOutlined,
  LayoutOutlined,
  SecurityScanOutlined
} from '@ant-design/icons-vue'

const {t} = useI18n()
const selectedKeys = ref<string[]>(['2'])
</script>

<style scoped lang="scss">

</style>
