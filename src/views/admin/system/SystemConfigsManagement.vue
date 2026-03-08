<template>
  <div class="system-configs-management">
    <a-card>
      <template #title>
        <span>{{ t('systemConfig.management.title') }}</span>
      </template>
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined/>
          </template>
          {{ t('systemConfig.management.add') }}
        </a-button>
      </template>

      <a-table
          :columns="columns"
          :data-source="dataSource"
          :loading="loading"
          :pagination="pagination"
          row-key="id"
          @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'id'">
            <a-tag>{{ record.id }}</a-tag>
          </template>
          <template v-if="column.key === 'configKey'">
            <a-tag>{{ record.configKey }}</a-tag>
          </template>
          <template v-if="column.key === 'configType'">
            <a-tag>{{ record.configType || 'string' }}</a-tag>
          </template>
          <template v-if="column.key === 'isPublic'">
            <a-tag :color="record.isPublic ? 'green' : 'default'">
              {{ record.isPublic ? t('systemConfig.common.yes') : t('systemConfig.common.no') }}
            </a-tag>
          </template>
          <template v-if="column.key === 'createdAt'">
            <a-tag>{{ record.createdAt }}</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">{{
                  t('systemConfig.management.edit')
                }}
              </a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record)">
                {{ t('systemConfig.management.delete') }}
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal
        v-model:open="modalVisible"
        :title="modalTitle"
        @ok="handleSubmit"
        @cancel="handleCancel"
    >
      <a-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
      >
        <a-collapse v-model:activeKey="modalCollapseActiveKey">
          <a-collapse-panel key="required" :header="t('systemConfig.management.form.basicInfo')" :force-render="true">
            <a-form-item :label="t('systemConfig.management.form.configKey')" name="configKey">
              <a-input v-model:value="formData.configKey" :disabled="!!formData.id"
                       :placeholder="t('systemConfig.management.form.configKeyPlaceholder')"/>
            </a-form-item>
            <a-form-item :label="t('systemConfig.management.form.configValue')" name="configValue">
              <a-textarea v-model:value="formData.configValue" :rows="3"/>
            </a-form-item>
            <a-form-item :label="t('systemConfig.management.form.configType')" name="configType">
              <a-select v-model:value="formData.configType">
                <a-select-option value="string">string</a-select-option>
                <a-select-option value="number">number</a-select-option>
                <a-select-option value="boolean">boolean</a-select-option>
                <a-select-option value="json">json</a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="optional" :header="t('systemConfig.management.form.extraInfo')">
            <a-form-item :label="t('systemConfig.management.form.description')" name="description">
              <a-input v-model:value="formData.description"/>
            </a-form-item>
            <a-form-item :label="t('systemConfig.management.form.isPublic')" name="isPublic">
              <a-select v-model:value="formData.isPublic">
                <a-select-option :value="1">{{ t('systemConfig.common.yes') }}</a-select-option>
                <a-select-option :value="0">{{ t('systemConfig.common.no') }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted, computed} from 'vue'
import {message, Modal} from 'ant-design-vue'
import {PlusOutlined} from '@ant-design/icons-vue'
import type {ColumnType} from 'ant-design-vue/es/table'
import type {TablePaginationConfig} from 'ant-design-vue/es/table'
import {getSystemConfigsPage, addSystemConfig, updateSystemConfig, deleteSystemConfig} from '@/api'
import type {FormInstance} from 'ant-design-vue'
import type {PageResult, SystemConfigsRecord} from '@/types/api'
import humps from 'humps'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref(t('systemConfig.management.add'))
const modalCollapseActiveKey = ref<string[]>(['required'])
const formRef = ref<FormInstance>()

interface PaginationConfig {
  current: number
  pageSize: number
  total: number
  showTotal: (total: number) => string
  showSizeChanger: boolean
  showQuickJumper: boolean
}

const columns = computed<ColumnType[]>(() => [
  {title: t('systemConfig.management.columns.id'), dataIndex: 'id', key: 'id', width: 80},
  {title: t('systemConfig.management.columns.configKey'), dataIndex: 'configKey', key: 'configKey'},
  {
    title: t('systemConfig.management.columns.configValue'),
    dataIndex: 'configValue',
    key: 'configValue',
    ellipsis: true
  },
  {title: t('systemConfig.management.columns.configType'), key: 'configType', width: 90},
  {
    title: t('systemConfig.management.columns.description'),
    dataIndex: 'description',
    key: 'description',
    ellipsis: true
  },
  {title: t('systemConfig.management.columns.isPublic'), key: 'isPublic', width: 70},
  {title: t('systemConfig.management.columns.createdAt'), dataIndex: 'createdAt', key: 'createdAt', width: 180},
  {title: t('systemConfig.management.columns.action'), key: 'action', width: 150, fixed: 'right'}
])

const dataSource = ref<SystemConfigsRecord[]>([])
const pagination = reactive<PaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => t('systemConfig.management.pagination.total', {total}),
  showSizeChanger: true,
  showQuickJumper: true
})

const formData = reactive<SystemConfigsRecord>({
  id: undefined,
  configKey: '',
  configValue: '',
  configType: 'string',
  description: undefined,
  isPublic: 0
})

const rules = {
  configKey: [{required: true, message: t('systemConfig.management.form.validate.configKey'), trigger: 'blur'}],
  configValue: [{required: true, message: t('systemConfig.management.form.validate.configValue'), trigger: 'blur'}],
  configType: [{required: true, message: t('systemConfig.management.form.validate.configType'), trigger: 'change'}]
}

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getSystemConfigsPage({
      page: pagination.current,
      size: pagination.pageSize
    })
    let {data} = response
    if (data?.code === 200 && data?.data) {
      data = humps.camelizeKeys(data) as PageResult<SystemConfigsRecord>
      dataSource.value = data.data || []
      pagination.total = data.total || 0
      pagination.current = data.current || 1
      pagination.pageSize = data.pageSize || 10
    }
  } catch {
    message.error(t('systemConfig.management.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleTableChange = (pag: TablePaginationConfig): void => {
  pagination.current = pag.current || 1
  pagination.pageSize = pag.pageSize || 10
  loadData()
}

const handleAdd = (): void => {
  modalTitle.value = t('systemConfig.management.add')
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {
    id: undefined,
    configKey: '',
    configValue: '',
    configType: 'string',
    description: undefined,
    isPublic: 0
  })
  modalVisible.value = true
}

const handleEdit = (record: SystemConfigsRecord): void => {
  modalTitle.value = t('systemConfig.management.edit')
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {...record})
  modalVisible.value = true
}

const handleDelete = (record: SystemConfigsRecord): void => {
  Modal.confirm({
    title: t('systemConfig.management.confirm.delete.title'),
    content: t('systemConfig.management.confirm.delete.content', {configKey: record.configKey}),
    onOk: async () => {
      try {
        if (record.id) {
          await deleteSystemConfig(record.id)
          message.success(t('systemConfig.management.messages.deleteSuccess'))
          await loadData()
        }
      } catch {
        message.error(t('systemConfig.management.messages.deleteFailed'))
      }
    }
  })
}

const handleSubmit = async (): Promise<void> => {
  try {
    await formRef.value?.validate()
    if (formData.id) {
      await updateSystemConfig(formData.id, formData)
      message.success(t('systemConfig.management.messages.updateSuccess'))
    } else {
      await addSystemConfig(formData)
      message.success(t('systemConfig.management.messages.createSuccess'))
    }
    modalVisible.value = false
    await loadData()
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

const handleCancel = (): void => {
  modalVisible.value = false
  formRef.value?.resetFields()
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
</style>
