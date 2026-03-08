<template>
  <div class="user-names-management">
    <a-card>
      <template #title>
        <span>{{ t('userNames.management.title') }}</span>
      </template>
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined/>
          </template>
          {{ t('userNames.management.add') }}
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
              {{ record.isDefaultDisplay === 1 ? t('userNames.common.yes') : t('userNames.common.no') }}
            </a-tag>
          </template>
          <template v-if="column.key === 'createdAt'">
            <a-tag>{{ record.createdAt }}</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">{{
                  t('userNames.management.edit')
                }}
              </a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record)">
                {{ t('userNames.management.delete') }}
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
          <a-collapse-panel key="required" :header="t('userNames.management.form.basicInfo')" :force-render="true">
            <a-form-item :label="t('userNames.management.form.userId')" name="userId">
              <a-input-number v-model:value="formData.userId" style="width: 100%" :min="1"
                              :disabled="!!formData.nameId"/>
            </a-form-item>
            <a-form-item :label="t('userNames.management.form.createName')" name="createName">
              <a-input-group compact style="display: flex">
                <a-input v-model:value="formData.createName" :disabled="!!formData.nameId"/>
                <a-button :disabled="!!formData.nameId" @click="handleRandomCreateName"
                          :title="t('userNames.management.form.randomCreateName')">
                  <ReloadOutlined/>
                </a-button>
              </a-input-group>
            </a-form-item>
            <a-form-item :label="t('userNames.management.form.displayName')" name="displayName">
              <a-input-group compact style="display: flex">
                <a-input v-model:value="formData.displayName"/>
                <a-button @click="handleRandomDisplayName" :title="t('userNames.management.form.randomDisplayName')">
                  <ReloadOutlined/>
                </a-button>
              </a-input-group>
            </a-form-item>
            <a-form-item :label="t('userNames.management.form.isDefaultDisplay')" name="isDefaultDisplay">
              <a-select v-model:value="formData.isDefaultDisplay">
                <a-select-option :value="1">{{ t('userNames.common.yes') }}</a-select-option>
                <a-select-option :value="0">{{ t('userNames.common.no') }}</a-select-option>
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
import {PlusOutlined, ReloadOutlined} from '@ant-design/icons-vue'
import type {ColumnType} from 'ant-design-vue/es/table'
import type {TablePaginationConfig} from 'ant-design-vue/es/table'
import {getNamesList, addName, updateName, deleteName} from '@/api'
import type {FormInstance} from 'ant-design-vue'
import type {PageResult, UserNamesRecord} from '@/types/api'
import humps from 'humps'
import {useUserStore} from '@/stores/user'
import {generateNickname, generateXmzId} from "@/utils"
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const userStore = useUserStore()
const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref(t('userNames.management.add'))
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

const columns = computed<ColumnType[]>(() => [
  {title: t('userNames.management.columns.nameId'), dataIndex: 'nameId', key: 'nameId', width: 90},
  {title: t('userNames.management.columns.userId'), dataIndex: 'userId', key: 'userId', width: 90},
  {title: t('userNames.management.columns.createName'), dataIndex: 'createName', key: 'createName'},
  {title: t('userNames.management.columns.displayName'), dataIndex: 'displayName', key: 'displayName'},
  {title: t('userNames.management.columns.isDefaultDisplay'), key: 'isDefaultDisplay', width: 100},
  {title: t('userNames.management.columns.createdAt'), dataIndex: 'createdAt', key: 'createdAt', width: 180},
  {title: t('userNames.management.columns.action'), key: 'action', width: 150, fixed: 'right'}
])

const dataSource = ref<UserNamesRecord[]>([])
const pagination = reactive<PaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => t('userNames.management.pagination.total', {total}),
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
  userId: [{required: true, message: t('userNames.management.form.validate.userId'), trigger: 'blur'}],
  createName: [{required: true, message: t('userNames.management.form.validate.createName'), trigger: 'blur'}],
  displayName: [{required: true, message: t('userNames.management.form.validate.displayName'), trigger: 'blur'}],
  isDefaultDisplay: [{
    required: true,
    message: t('userNames.management.form.validate.isDefaultDisplay'),
    trigger: 'change'
  }]
}

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getNamesList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    let {data} = response
    if (data?.code === 200 && data?.data) {
      data = humps.camelizeKeys(data) as PageResult<UserNamesRecord>
      dataSource.value = data.data || []
      pagination.total = data.total || 0
      pagination.current = data.current || 1
      pagination.pageSize = data.pageSize || 10
    }
  } catch {
    message.error(t('userNames.management.messages.loadFailed'))
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
  modalTitle.value = t('userNames.management.add')
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
  modalTitle.value = t('userNames.management.edit')
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {...record})
  modalVisible.value = true
}

const handleDelete = (record: UserNamesRecord): void => {
  Modal.confirm({
    title: t('userNames.management.confirm.delete.title'),
    content: t('userNames.management.confirm.delete.content', {displayName: record.displayName}),
    onOk: async () => {
      try {
        if (record.nameId) {
          await deleteName(record.nameId)
          message.success(t('userNames.management.messages.deleteSuccess'))
          await loadData()
        }
      } catch {
        message.error(t('userNames.management.messages.deleteFailed'))
      }
    }
  })
}

const handleSubmit = async (): Promise<void> => {
  try {
    await formRef.value?.validate()
    if (formData.nameId) {
      await updateName(formData.nameId, formData)
      message.success(t('userNames.management.messages.updateSuccess'))
    } else {
      await addName(formData)
      message.success(t('userNames.management.messages.createSuccess'))
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
