<template>
  <div class="user-feedback-management">
    <a-card>
      <template #title>
        <span>{{ t('userFeedback.management.title') }}</span>
      </template>
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined/>
          </template>
          {{ t('userFeedback.management.add') }}
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
              <a-button type="link" size="small" @click="handleEdit(record)">{{
                  t('userFeedback.management.edit')
                }}
              </a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record)">
                {{ t('userFeedback.management.delete') }}
              </a-button>
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
          <a-collapse-panel key="required" :header="t('userFeedback.management.form.basicInfo')" :force-render="true">
            <a-form-item :label="t('userFeedback.management.form.userId')" name="userId">
              <a-input-number v-model:value="formData.userId" style="width: 100%" :min="1" :disabled="!!formData.id"/>
            </a-form-item>
            <a-form-item :label="t('userFeedback.management.form.type')" name="type">
              <a-select v-model:value="formData.type">
                <a-select-option :value="1">{{ t('userFeedback.common.type.systemIssue') }}</a-select-option>
                <a-select-option :value="2">{{ t('userFeedback.common.type.featureSuggestion') }}</a-select-option>
                <a-select-option :value="3">{{ t('userFeedback.common.type.bugReport') }}</a-select-option>
                <a-select-option :value="4">{{ t('userFeedback.common.type.other') }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="t('userFeedback.management.form.content')" name="content">
              <a-textarea v-model:value="formData.content" :rows="4"/>
            </a-form-item>
            <a-form-item :label="t('userFeedback.management.form.status')" name="status">
              <a-select v-model:value="formData.status">
                <a-select-option :value="1">{{ t('userFeedback.common.status.pending') }}</a-select-option>
                <a-select-option :value="2">{{ t('userFeedback.common.status.accepted') }}</a-select-option>
                <a-select-option :value="3">{{ t('userFeedback.common.status.resolved') }}</a-select-option>
                <a-select-option :value="4">{{ t('userFeedback.common.status.closed') }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="optional" :header="t('userFeedback.management.form.extraInfo')">
            <a-form-item :label="t('userFeedback.management.form.contactInfo')" name="contactInfo">
              <a-input v-model:value="formData.contactInfo"/>
            </a-form-item>
            <a-form-item :label="t('userFeedback.management.form.reply')" name="reply">
              <a-textarea v-model:value="formData.reply" :rows="3"/>
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
import {getFeedbackList, addFeedback, updateFeedback, deleteFeedback} from '@/api'
import type {FormInstance} from 'ant-design-vue'
import type {PageResult, UserFeedbackRecord} from '@/types/api'
import humps from 'humps'
import {useUserStore} from '@/stores/user'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const typeLabelMap = computed<Record<number, string>>(() => ({
  1: t('userFeedback.common.type.systemIssue'),
  2: t('userFeedback.common.type.featureSuggestion'),
  3: t('userFeedback.common.type.bugReport'),
  4: t('userFeedback.common.type.other')
}))
const typeColorMap: Record<number, string> = {
  1: 'orange',
  2: 'blue',
  3: 'red',
  4: 'default'
}
const statusLabelMap = computed<Record<number, string>>(() => ({
  1: t('userFeedback.common.status.pending'),
  2: t('userFeedback.common.status.accepted'),
  3: t('userFeedback.common.status.resolved'),
  4: t('userFeedback.common.status.closed')
}))
const statusColorMap: Record<number, string> = {
  1: 'gold',
  2: 'blue',
  3: 'green',
  4: 'default'
}

const userStore = useUserStore()
const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref(t('userFeedback.management.add'))
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
  {title: t('userFeedback.management.columns.id'), dataIndex: 'id', key: 'id', width: 80},
  {title: t('userFeedback.management.columns.userId'), dataIndex: 'userId', key: 'userId', width: 90},
  {title: t('userFeedback.management.columns.type'), key: 'type', width: 100},
  {title: t('userFeedback.management.columns.content'), dataIndex: 'content', key: 'content', ellipsis: true},
  {title: t('userFeedback.management.columns.status'), key: 'status', width: 90},
  {title: t('userFeedback.management.columns.createdAt'), dataIndex: 'createdAt', key: 'createdAt', width: 180},
  {title: t('userFeedback.management.columns.action'), key: 'action', width: 150, fixed: 'right'}
])

const dataSource = ref<UserFeedbackRecord[]>([])
const pagination = reactive<PaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => t('userFeedback.management.pagination.total', {total}),
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
  userId: [{required: true, message: t('userFeedback.management.form.validate.userId'), trigger: 'blur'}],
  type: [{required: true, message: t('userFeedback.management.form.validate.type'), trigger: 'change'}],
  content: [{required: true, message: t('userFeedback.management.form.validate.content'), trigger: 'blur'}],
  status: [{required: true, message: t('userFeedback.management.form.validate.status'), trigger: 'change'}]
}

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getFeedbackList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    let {data} = response
    if (data?.code === 200 && data?.data) {
      data = humps.camelizeKeys(data) as PageResult<UserFeedbackRecord>
      dataSource.value = data.data || []
      pagination.total = data.total || 0
      pagination.current = data.current || 1
      pagination.pageSize = data.pageSize || 10
    }
  } catch {
    message.error(t('userFeedback.management.messages.loadFailed'))
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
  modalTitle.value = t('userFeedback.management.add')
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
  modalTitle.value = t('userFeedback.management.edit')
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {...record})
  modalVisible.value = true
}

const handleDelete = (record: UserFeedbackRecord): void => {
  Modal.confirm({
    title: t('userFeedback.management.confirm.delete.title'),
    content: t('userFeedback.management.confirm.delete.content', {id: record.id}),
    onOk: async () => {
      try {
        if (record.id) {
          await deleteFeedback(record.id)
          message.success(t('userFeedback.management.messages.deleteSuccess'))
          await loadData()
        }
      } catch {
        message.error(t('userFeedback.management.messages.deleteFailed'))
      }
    }
  })
}

const handleSubmit = async (): Promise<void> => {
  try {
    await formRef.value?.validate()
    if (formData.id) {
      await updateFeedback(formData.id, formData)
      message.success(t('userFeedback.management.messages.updateSuccess'))
    } else {
      await addFeedback(formData)
      message.success(t('userFeedback.management.messages.createSuccess'))
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
