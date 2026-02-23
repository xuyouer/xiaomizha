<template>
  <div class="about-container">
    <Header :selected-keys="selectedKeys" />

    <div class="main-content">
      <div class="content-container">
        <div class="about-card">
          <div class="card-header">
            <h2>关于项目</h2>
          </div>
          <div class="card-content">
            <div class="project-info">
              <a-descriptions title="项目信息" bordered :column="1">
                <a-descriptions-item label="项目名称">小咪楂 (xiaomizha)</a-descriptions-item>
                <a-descriptions-item label="技术栈">
                  <a-tag color="blue">Vue 3</a-tag>
                  <a-tag color="green">TypeScript</a-tag>
                  <a-tag color="orange">Vite</a-tag>
                  <a-tag color="purple">Ant Design Vue</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="构建工具">Vite</a-descriptions-item>
                <a-descriptions-item label="UI 组件库">Ant Design Vue</a-descriptions-item>
                <a-descriptions-item label="路由管理">Vue Router</a-descriptions-item>
              </a-descriptions>
            </div>

            <a-divider />

            <div class="tech-info">
              <h3>技术说明</h3>
              <a-timeline>
                <a-timeline-item color="green">
                  <p>Vite - 下一代前端构建工具，提供极速的开发体验</p>
                </a-timeline-item>
                <a-timeline-item color="blue">
                  <p>Vue 3 - 渐进式 JavaScript 框架，使用 Composition API</p>
                </a-timeline-item>
                <a-timeline-item color="purple">
                  <p>TypeScript - 为 JavaScript 添加类型系统</p>
                </a-timeline-item>
                <a-timeline-item color="orange">
                  <p>Ant Design Vue - 企业级 UI 设计语言和组件库</p>
                </a-timeline-item>
              </a-timeline>
            </div>

            <div class="features-section">
              <h3>功能特性</h3>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">
                    <CodeOutlined style="font-size: 24px; color: #1890ff;" />
                  </div>
                  <div class="feature-content">
                    <h4>现代化开发</h4>
                    <p>使用 Vue 3 Composition API 和 TypeScript 提供类型安全的开发体验</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">
                    <RocketOutlined style="font-size: 24px; color: #52c41a;" />
                  </div>
                  <div class="feature-content">
                    <h4>极速构建</h4>
                    <p>基于 Vite 的开发服务器和构建工具，提供毫秒级的热更新</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">
                    <LayoutOutlined style="font-size: 24px; color: #faad14;" />
                  </div>
                  <div class="feature-content">
                    <h4>精美 UI</h4>
                    <p>集成 Ant Design Vue 组件库，提供丰富的 UI 组件和设计规范</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">
                    <SecurityScanOutlined style="font-size: 24px; color: #f5222d;" />
                  </div>
                  <div class="feature-content">
                    <h4>安全可靠</h4>
                    <p>内置路由守卫和状态管理，提供安全的用户认证和权限控制</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  CodeOutlined,
  RocketOutlined,
  LayoutOutlined,
  SecurityScanOutlined
} from '@ant-design/icons-vue'

const selectedKeys = ref<string[]>(['2'])
</script>

<style scoped lang="scss">

</style>
