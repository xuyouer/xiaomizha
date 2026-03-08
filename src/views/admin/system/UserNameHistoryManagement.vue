<template>
  <div class="user-name-history-management">
    <a-card>
      <template #title>
        <span>{{ t('userNameHistory.management.title') }}</span>
      </template>
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined/>
          </template>
          {{ t('userNameHistory.management.add') }}
        </a-button>
      </template>

      <a-table
          :columns="columns"
          :data-source="dataSource"
          :loading="loading"
          :pagination="pagination"
          row-key="historyId"
          @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'historyId'">
            <a-tag>{{ record.historyId }}</a-tag>
          </template>
          <template v-if="column.key === 'userId'">
            <a-tag>{{ record.userId }}</a-tag>
          </template>
          <template v-if="column.key === 'changedAt'">
            <a-tag>{{ record.changedAt }}</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">{{
                  t('userNameHistory.management.edit')
                }}
              </a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record)">
                {{ t('userNameHistory.management.delete') }}
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
          <a-collapse-panel key="required" :header="t('userNameHistory.management.form.basicInfo')"
                            :force-render="true">
            <a-form-item :label="t('userNameHistory.management.form.userId')" name="userId">
              <a-input-number v-model:value="formData.userId" style="width: 100%" :min="1" :disabled="isEditMode"/>
            </a-form-item>
            <a-form-item :label="t('userNameHistory.management.form.oldDisplayName')" name="oldDisplayName">
              <a-input v-model:value="formData.oldDisplayName"/>
            </a-form-item>
            <a-form-item :label="t('userNameHistory.management.form.newDisplayName')" name="newDisplayName">
              <a-input-group compact style="display: flex">
                <a-input v-model:value="formData.newDisplayName"/>
                <a-button @click="handleRandomNewDisplayName"
                          :title="t('userNameHistory.management.form.randomNewDisplayName')">
                  <ReloadOutlined/>
                </a-button>
              </a-input-group>
            </a-form-item>
            <a-form-item
                :label="isEditMode ? t('userNameHistory.management.form.changedBy') : t('userNameHistory.management.form.createdBy')"
                name="changedBy">
              <a-input-number v-model:value="formData.changedBy" style="width: 100%" :min="0" :disabled="true"/>
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
import {PlusOutlined, ReloadOutlined} from '@ant-design/icons-vue'
import type {ColumnType} from 'ant-design-vue/es/table'
import type {TablePaginationConfig} from 'ant-design-vue/es/table'
import {getNameHistoryList, addHistory, updateHistory, deleteHistory} from '@/api'
import type {FormInstance} from 'ant-design-vue'
import type {PageResult, UserNameHistoryRecord} from '@/types/api'
import humps from 'humps'
import {useUserStore} from '@/stores/user'
import {generateNickname} from "@/utils"
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const userStore = useUserStore()
const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref(t('userNameHistory.management.add'))
const modalCollapseActiveKey = ref<string[]>(['required'])
const formRef = ref<FormInstance>()
const isEditMode = computed(() => !!formData.historyId)

interface PaginationConfig {
  current: number
  pageSize: number
  total: number
  showTotal: (total: number) => string
  showSizeChanger: boolean
  showQuickJumper: boolean
}

const columns = computed<ColumnType[]>(() => [
  {title: t('userNameHistory.management.columns.historyId'), dataIndex: 'historyId', key: 'historyId', width: 90},
  {title: t('userNameHistory.management.columns.userId'), dataIndex: 'userId', key: 'userId', width: 90},
  {title: t('userNameHistory.management.columns.oldDisplayName'), dataIndex: 'oldDisplayName', key: 'oldDisplayName'},
  {title: t('userNameHistory.management.columns.newDisplayName'), dataIndex: 'newDisplayName', key: 'newDisplayName'},
  {title: t('userNameHistory.management.columns.changedBy'), dataIndex: 'changedBy', key: 'changedBy', width: 90},
  {title: t('userNameHistory.management.columns.changedAt'), key: 'changedAt', width: 180},
  {title: t('userNameHistory.management.columns.action'), key: 'action', width: 150, fixed: 'right'}
])

const dataSource = ref<UserNameHistoryRecord[]>([])
const pagination = reactive<PaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => t('userNameHistory.management.pagination.total', {total}),
  showSizeChanger: true,
  showQuickJumper: true
})

const formData = reactive<UserNameHistoryRecord>({
  historyId: undefined,
  userId: undefined,
  oldDisplayName: '',
  newDisplayName: '',
  changedBy: undefined,
  changedAt: undefined
})

const rules = {
  userId: [{required: true, message: t('userNameHistory.management.form.validate.userId'), trigger: 'blur'}],
  oldDisplayName: [{
    required: true,
    message: t('userNameHistory.management.form.validate.oldDisplayName'),
    trigger: 'blur'
  }],
  newDisplayName: [{
    required: true,
    message: t('userNameHistory.management.form.validate.newDisplayName'),
    trigger: 'blur'
  }]
}

const handleRandomNewDisplayName = (): void => {
  formData.newDisplayName = generateNickname()
  formRef.value?.clearValidate?.(['newDisplayName'])
}

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getNameHistoryList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    let {data} = response
    if (data?.code === 200 && data?.data) {
      data = humps.camelizeKeys(data) as PageResult<UserNameHistoryRecord>
      dataSource.value = data.data || []
      pagination.total = data.total || 0
      pagination.current = data.current || 1
      pagination.pageSize = data.pageSize || 10
    }
  } catch {
    message.error(t('userNameHistory.management.messages.loadFailed'))
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
  modalTitle.value = t('userNameHistory.management.add')
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {
    historyId: undefined,
    userId: userStore.currentUserId,
    oldDisplayName: '',
    newDisplayName: '',
    changedBy: userStore.currentUserId,
    changedAt: undefined
  })
  modalVisible.value = true
}

const handleEdit = (record: UserNameHistoryRecord): void => {
  modalTitle.value = t('userNameHistory.management.edit')
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {
    ...record,
    changedBy: userStore.currentUserId || record.changedBy
  })
  modalVisible.value = true
}

const handleDelete = (record: UserNameHistoryRecord): void => {
  Modal.confirm({
    title: t('userNameHistory.management.confirm.delete.title'),
    content: t('userNameHistory.management.confirm.delete.content', {historyId: record.historyId}),
    onOk: async () => {
      try {
        if (record.historyId) {
          await deleteHistory(record.historyId)
          message.success(t('userNameHistory.management.messages.deleteSuccess'))
          await loadData()
        }
      } catch {
        message.error(t('userNameHistory.management.messages.deleteFailed'))
      }
    }
  })
}

const handleSubmit = async (): Promise<void> => {
  try {
    await formRef.value?.validate()
    if (formData.historyId) {
      await updateHistory(formData.historyId, formData)
      message.success(t('userNameHistory.management.messages.updateSuccess'))
    } else {
      await addHistory(formData)
      message.success(t('userNameHistory.management.messages.createSuccess'))
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
