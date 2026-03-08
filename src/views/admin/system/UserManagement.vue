<template>
  <div class="user-management">
    <a-card>
      <template #title>
        <span>{{ t('userManagement.title') }}</span>
      </template>
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined/>
          </template>
          {{ t('userManagement.addUser') }}
        </a-button>
      </template>

      <a-table
          :columns="columns"
          :data-source="dataSource"
          :loading="loading"
          :pagination="pagination"
          row-key="userId"
          @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'userId'">
            <a-tag>
              {{ record.userId }}
            </a-tag>
          </template>
          <template v-if="column.key === 'username'">
            <a-tag>
              {{ record.username }}
            </a-tag>
          </template>
          <template v-if="column.key === 'accountStatus'">
            <a-tag :color="record.accountStatus === 1 ? 'green' : 'red'">
              {{ record.accountStatus === 1 ? t('userManagement.status.normal') : t('userManagement.status.disabled') }}
            </a-tag>
          </template>
          <template v-if="column.key === 'createdAt'">
            <a-tag>
              {{ record.createdAt }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleDetail(record)">{{
                  t('userManagement.detail')
                }}
              </a-button>
              <a-button type="link" size="small" @click="handleEdit(record)">{{ t('userManagement.edit') }}</a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record)">{{
                  t('userManagement.delete')
                }}
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
          <a-collapse-panel key="required" :header="t('userManagement.form.basicInfo')" :force-render="true">
            <a-form-item :label="t('userManagement.form.username')" name="username">
              <a-input-group compact style="display: flex">
                <a-input v-model:value="formData.username" :disabled="!!formData.userId"/>
                <a-button :disabled="!!formData.userId" @click="handleRandomUsername"
                          :title="t('userManagement.form.randomUsername')">
                  <ReloadOutlined/>
                </a-button>
              </a-input-group>
            </a-form-item>
            <a-form-item :label="t('userManagement.form.password')" name="passwordHash" v-if="!formData.userId">
              <a-input-group compact style="display: flex">
                <a-input-password v-model:value="formData.passwordHash"/>
                <a-button @click="handleRandomPassword" :title="t('userManagement.form.randomPassword')">
                  <ReloadOutlined/>
                </a-button>
              </a-input-group>
            </a-form-item>
            <a-form-item :label="t('userManagement.form.accountStatus')" name="accountStatus">
              <a-select v-model:value="formData.accountStatus">
                <a-select-option :value="1">{{ t('userManagement.status.normal') }}</a-select-option>
                <a-select-option :value="0">{{ t('userManagement.status.disabled') }}</a-select-option>
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
import {useRouter} from 'vue-router'
import {message, Modal} from 'ant-design-vue'
import {PlusOutlined, ReloadOutlined} from '@ant-design/icons-vue'
import type {ColumnType} from 'ant-design-vue/es/table'
import type {TablePaginationConfig} from 'ant-design-vue/es/table'
import {getUserList, registerUser, updateUser, logoutUser} from '@/api'
import type {FormInstance} from 'ant-design-vue'
import type {PageResult, User} from "@/types/api"
import humps from "humps"
import {generateNickname, generatePassword} from "@/utils"
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const router = useRouter()
const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref(t('userManagement.addUser'))
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
  {
    title: t('userManagement.columns.userId'),
    dataIndex: 'userId',
    key: 'userId',
    width: 100
  },
  {
    title: t('userManagement.columns.username'),
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: t('userManagement.columns.accountStatus'),
    key: 'accountStatus',
    width: 100
  },
  {
    title: t('userManagement.columns.createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 180
  },
  {
    title: t('userManagement.columns.action'),
    key: 'action',
    width: 150,
    fixed: 'right'
  }
])

const dataSource = ref<User[]>([])
const pagination = reactive<PaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => t('userManagement.pagination.total', {total}),
  showSizeChanger: true,
  showQuickJumper: true
})

const formData = reactive({
  userId: undefined as number | undefined,
  username: '',
  passwordHash: '',
  accountStatus: 1
})

const rules = {
  username: [{required: true, message: t('userManagement.form.validate.username'), trigger: 'blur'}],
  passwordHash: [{required: true, message: t('userManagement.form.validate.password'), trigger: 'blur'}],
  accountStatus: [{required: true, message: t('userManagement.form.validate.accountStatus'), trigger: 'change'}]
}

const handleRandomUsername = (): void => {
  formData.username = generateNickname()
  formRef.value?.clearValidate?.(['username'])
}

const handleRandomPassword = (): void => {
  formData.passwordHash = generatePassword()
  formRef.value?.clearValidate?.(['passwordHash'])
}

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getUserList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    let {data} = response
    if (data.code === 200 && data.data) {
      data = humps.camelizeKeys(data) as PageResult<User>
      dataSource.value = data.data || []
      pagination.total = data.total || 0
      pagination.current = data.current || 1
      pagination.pageSize = data.pageSize || 10
    }
  } catch {
    message.error(t('userManagement.messages.loadFailed'))
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
  modalTitle.value = t('userManagement.addUser')
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {
    userId: undefined,
    username: '',
    passwordHash: '',
    accountStatus: 1
  })
  modalVisible.value = true
}

const handleDetail = (record: User): void => {
  router.push({
    path: '/admin/system/user-details',
    query: {userId: record.userId}
  })
}

const handleEdit = (record: User): void => {
  modalTitle.value = t('userManagement.editUser')
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, record)
  modalVisible.value = true
}

const handleDelete = (record: User): void => {
  Modal.confirm({
    title: t('userManagement.confirm.delete.title'),
    content: t('userManagement.confirm.delete.content', {username: record.username}),
    onOk: async () => {
      try {
        if (record.userId) {
          await logoutUser(record.userId)
          message.success(t('userManagement.messages.deleteSuccess'))
          await loadData()
        }
      } catch {
        message.error(t('userManagement.messages.deleteFailed'))
      }
    }
  })
}

const handleSubmit = async (): Promise<void> => {
  try {
    await formRef.value?.validate()
    if (formData.userId) {
      await updateUser(formData.userId, formData)
      message.success(t('userManagement.messages.updateSuccess'))
    } else {
      await registerUser(formData as User)
      message.success(t('userManagement.messages.registerSuccess'))
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
