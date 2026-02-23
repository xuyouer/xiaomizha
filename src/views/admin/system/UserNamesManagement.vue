<template>
  <div class="user-names-management">
    <a-card>
      <template #title>
        <span>用户名信息管理</span>
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
        row-key="nameId"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'nameId'">
            <a-tag>{{ record.nameId }}</a-tag>
          </template>
          <template v-if="column.key === 'userId'">
            <a-tag>{{ record.userId }}</a-tag>
          </template>
          <template v-if="column.key === 'createName'">
            <a-tag>{{ record.createName }}</a-tag>
          </template>
          <template v-if="column.key === 'isDefaultDisplay'">
            <a-tag :color="record.isDefaultDisplay === 1 ? 'green' : 'default'">
              {{ record.isDefaultDisplay === 1 ? '是' : '否' }}
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
            <a-form-item label="用户ID" name="userId">
              <a-input-number v-model:value="formData.userId" style="width: 100%" :min="1" :disabled="!!formData.nameId" />
            </a-form-item>
            <a-form-item label="创建用户名" name="createName">
              <a-input-group compact style="display: flex">
                <a-input v-model:value="formData.createName" :disabled="!!formData.nameId" />
                <a-button :disabled="!!formData.nameId" @click="handleRandomCreateName">
                  <ReloadOutlined />
                </a-button>
              </a-input-group>
            </a-form-item>
            <a-form-item label="显示名称" name="displayName">
              <a-input-group compact style="display: flex">
                <a-input v-model:value="formData.displayName" />
                <a-button @click="handleRandomDisplayName">
                  <ReloadOutlined />
                </a-button>
              </a-input-group>
            </a-form-item>
            <a-form-item label="默认显示" name="isDefaultDisplay">
              <a-select v-model:value="formData.isDefaultDisplay">
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
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import type { ColumnType } from 'ant-design-vue/es/table'
import type { TablePaginationConfig } from 'ant-design-vue/es/table'
import { getNamesList, addName, updateName, deleteName } from '@/api/names'
import type { FormInstance } from 'ant-design-vue'
import type { PageResult, UserNamesRecord } from '@/types/api'
import humps from 'humps'
import { useUserStore } from '@/stores/user'
import { generateNickname, generateXmzId } from "@/utils"

const userStore = useUserStore()
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

const handleRandomCreateName = (): void => {
  formData.createName = generateXmzId()
  formRef.value?.clearValidate?.(['createName'])
}

const handleRandomDisplayName = (): void => {
  formData.displayName = generateNickname()
  formRef.value?.clearValidate?.(['displayName'])
}

const columns: ColumnType[] = [
  { title: '名称ID', dataIndex: 'nameId', key: 'nameId', width: 90 },
  { title: '用户ID', dataIndex: 'userId', key: 'userId', width: 90 },
  { title: '创建用户名', dataIndex: 'createName', key: 'createName' },
  { title: '显示名称', dataIndex: 'displayName', key: 'displayName' },
  { title: '默认显示', key: 'isDefaultDisplay', width: 100 },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 180 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' }
]

const dataSource = ref<UserNamesRecord[]>([])
const pagination = reactive<PaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条`,
  showSizeChanger: true,
  showQuickJumper: true
})

const formData = reactive<UserNamesRecord>({
  nameId: undefined,
  userId: undefined,
  createName: '',
  displayName: '',
  isDefaultDisplay: 1
})

const rules = {
  userId: [{ required: true, message: '请输入用户ID', trigger: 'blur' }],
  createName: [{ required: true, message: '请输入创建用户名', trigger: 'blur' }],
  displayName: [{ required: true, message: '请输入显示名称', trigger: 'blur' }],
  isDefaultDisplay: [{ required: true, message: '请选择', trigger: 'change' }]
}

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getNamesList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    let { data } = response
    if (data?.code === 200 && data?.data) {
      data = humps.camelizeKeys(data) as PageResult<UserNamesRecord>
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
    nameId: undefined,
    userId: userStore.currentUserId,
    createName: generateXmzId(),
    displayName: generateNickname(),
    isDefaultDisplay: 1
  })
  modalVisible.value = true
}

const handleEdit = (record: UserNamesRecord): void => {
  modalTitle.value = '编辑'
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, { ...record })
  modalVisible.value = true
}

const handleDelete = (record: UserNamesRecord): void => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除用户名 "${record.displayName}" 吗？`,
    onOk: async () => {
      try {
        if (record.nameId) {
          await deleteName(record.nameId)
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
    if (formData.nameId) {
      await updateName(formData.nameId, formData)
      message.success('更新成功')
    } else {
      await addName(formData)
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
