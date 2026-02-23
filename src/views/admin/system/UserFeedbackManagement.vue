<template>
  <div class="user-feedback-management">
    <a-card>
      <template #title>
        <span>用户反馈</span>
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
          <template v-if="column.key === 'userId'">
            <a-tag>{{ record.userId }}</a-tag>
          </template>
          <template v-if="column.key === 'type'">
            <a-tag :color="typeColorMap[record.type ?? 0]">
              {{ typeLabelMap[record.type ?? 0] }}
            </a-tag>
          </template>
          <template v-if="column.key === 'status'">
            <a-tag :color="statusColorMap[record.status ?? 0]">
              {{ statusLabelMap[record.status ?? 0] }}
            </a-tag>
          </template>
          <template v-if="column.key === 'content'">
            <span class="ellipsis-cell">{{ record.content }}</span>
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
      :width="560"
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
              <a-input-number v-model:value="formData.userId" style="width: 100%" :min="1" :disabled="!!formData.id" />
            </a-form-item>
            <a-form-item label="反馈类型" name="type">
              <a-select v-model:value="formData.type">
                <a-select-option :value="1">系统问题</a-select-option>
                <a-select-option :value="2">功能建议</a-select-option>
                <a-select-option :value="3">BUG反馈</a-select-option>
                <a-select-option :value="4">其他</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="反馈内容" name="content">
              <a-textarea v-model:value="formData.content" :rows="4" />
            </a-form-item>
            <a-form-item label="状态" name="status">
              <a-select v-model:value="formData.status">
                <a-select-option :value="1">待处理</a-select-option>
                <a-select-option :value="2">已受理</a-select-option>
                <a-select-option :value="3">已解决</a-select-option>
                <a-select-option :value="4">已关闭</a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="optional" header="扩展信息（选填）">
            <a-form-item label="联系方式" name="contactInfo">
              <a-input v-model:value="formData.contactInfo" />
            </a-form-item>
            <a-form-item label="回复内容" name="reply">
              <a-textarea v-model:value="formData.reply" :rows="3" />
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
import { getFeedbackList, addFeedback, updateFeedback, deleteFeedback } from '@/api/feedback'
import type { FormInstance } from 'ant-design-vue'
import type { PageResult, UserFeedbackRecord } from '@/types/api'
import humps from 'humps'
import { useUserStore } from '@/stores/user'

const typeLabelMap: Record<number, string> = {
  1: '系统问题',
  2: '功能建议',
  3: 'BUG反馈',
  4: '其他'
}
const typeColorMap: Record<number, string> = {
  1: 'orange',
  2: 'blue',
  3: 'red',
  4: 'default'
}
const statusLabelMap: Record<number, string> = {
  1: '待处理',
  2: '已受理',
  3: '已解决',
  4: '已关闭'
}
const statusColorMap: Record<number, string> = {
  1: 'gold',
  2: 'blue',
  3: 'green',
  4: 'default'
}

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

const columns: ColumnType[] = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '用户ID', dataIndex: 'userId', key: 'userId', width: 90 },
  { title: '类型', key: 'type', width: 100 },
  { title: '内容', dataIndex: 'content', key: 'content', ellipsis: true },
  { title: '状态', key: 'status', width: 90 },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 180 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' }
]

const dataSource = ref<UserFeedbackRecord[]>([])
const pagination = reactive<PaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条`,
  showSizeChanger: true,
  showQuickJumper: true
})

const formData = reactive<UserFeedbackRecord>({
  id: undefined,
  userId: undefined,
  type: 1,
  content: '',
  contactInfo: undefined,
  status: 1,
  reply: undefined
})

const rules = {
  userId: [{ required: true, message: '请输入用户ID', trigger: 'blur' }],
  type: [{ required: true, message: '请选择反馈类型', trigger: 'change' }],
  content: [{ required: true, message: '请输入反馈内容', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getFeedbackList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    let { data } = response
    if (data?.code === 200 && data?.data) {
      data = humps.camelizeKeys(data) as PageResult<UserFeedbackRecord>
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
    userId: userStore.currentUserId,
    type: 1,
    content: '',
    contactInfo: undefined,
    status: 1,
    reply: undefined
  })
  modalVisible.value = true
}

const handleEdit = (record: UserFeedbackRecord): void => {
  modalTitle.value = '编辑'
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, { ...record })
  modalVisible.value = true
}

const handleDelete = (record: UserFeedbackRecord): void => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除反馈 #${record.id} 吗？`,
    onOk: async () => {
      try {
        if (record.id) {
          await deleteFeedback(record.id)
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
      await updateFeedback(formData.id, formData)
      message.success('更新成功')
    } else {
      await addFeedback(formData)
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
