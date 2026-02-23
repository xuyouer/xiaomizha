<template>
  <div class="system-configs-management">
    <a-card>
      <template #title>
        <span>系统配置</span>
      </template>
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined />
          </template>
          新增
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
              {{ record.isPublic ? '是' : '否' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'createdAt'">
            <a-tag>{{ record.createdAt }}</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">编辑</a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record)">删除</a-button>
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
          <a-collapse-panel key="required" header="基本信息（必填）" :force-render="true">
            <a-form-item label="配置键" name="configKey">
              <a-input v-model:value="formData.configKey" :disabled="!!formData.id" placeholder="唯一键，如 app.name" />
            </a-form-item>
            <a-form-item label="配置值" name="configValue">
              <a-textarea v-model:value="formData.configValue" :rows="3" />
            </a-form-item>
            <a-form-item label="配置类型" name="configType">
              <a-select v-model:value="formData.configType">
                <a-select-option value="string">string</a-select-option>
                <a-select-option value="number">number</a-select-option>
                <a-select-option value="boolean">boolean</a-select-option>
                <a-select-option value="json">json</a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="optional" header="扩展信息（选填）">
            <a-form-item label="描述" name="description">
              <a-input v-model:value="formData.description" />
            </a-form-item>
            <a-form-item label="公开配置" name="isPublic">
              <a-select v-model:value="formData.isPublic">
                <a-select-option :value="1">是</a-select-option>
                <a-select-option :value="0">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { ColumnType } from 'ant-design-vue/es/table'
import type { TablePaginationConfig } from 'ant-design-vue/es/table'
import { getSystemConfigsPage, addSystemConfig, updateSystemConfig, deleteSystemConfig } from '@/api/systemConfigs'
import type { FormInstance } from 'ant-design-vue'
import type { PageResult, SystemConfigsRecord } from '@/types/api'
import humps from 'humps'

const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref('新增')
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

const columns: ColumnType[] = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '配置键', dataIndex: 'configKey', key: 'configKey' },
  { title: '配置值', dataIndex: 'configValue', key: 'configValue', ellipsis: true },
  { title: '类型', key: 'configType', width: 90 },
  { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
  { title: '公开', key: 'isPublic', width: 70 },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 180 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' }
]

const dataSource = ref<SystemConfigsRecord[]>([])
const pagination = reactive<PaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条`,
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
  configKey: [{ required: true, message: '请输入配置键', trigger: 'blur' }],
  configValue: [{ required: true, message: '请输入配置值', trigger: 'blur' }],
  configType: [{ required: true, message: '请选择类型', trigger: 'change' }]
}

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getSystemConfigsPage({
      page: pagination.current,
      size: pagination.pageSize
    })
    let { data } = response
    if (data?.code === 200 && data?.data) {
      data = humps.camelizeKeys(data) as PageResult<SystemConfigsRecord>
      dataSource.value = data.data || []
      pagination.total = data.total || 0
      pagination.current = data.current || 1
      pagination.pageSize = data.pageSize || 10
    }
  } catch {
    message.error('加载数据失败')
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
  modalTitle.value = '新增'
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
  modalTitle.value = '编辑'
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, { ...record })
  modalVisible.value = true
}

const handleDelete = (record: SystemConfigsRecord): void => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除配置 "${record.configKey}" 吗？`,
    onOk: async () => {
      try {
        if (record.id) {
          await deleteSystemConfig(record.id)
          message.success('删除成功')
          await loadData()
        }
      } catch {
        message.error('删除失败')
      }
    }
  })
}

const handleSubmit = async (): Promise<void> => {
  try {
    await formRef.value?.validate()
    if (formData.id) {
      await updateSystemConfig(formData.id, formData)
      message.success('更新成功')
    } else {
      await addSystemConfig(formData)
      message.success('新增成功')
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
