<template>
  <div class="user-management">
    <a-card>
      <template #title>
        <span>用户管理</span>
      </template>
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined />
          </template>
          新增用户
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
              {{ record.accountStatus === 1 ? '正常' : '禁用' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'createdAt'">
            <a-tag>
              {{ record.createdAt }}
            </a-tag>
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
            <a-form-item label="用户名" name="username">
              <a-input-group compact style="display: flex">
                <a-input v-model:value="formData.username" :disabled="!!formData.userId" />
                <a-button :disabled="!!formData.userId" @click="handleRandomUsername">
                  <ReloadOutlined />
                </a-button>
              </a-input-group>
            </a-form-item>
            <a-form-item label="密码" name="passwordHash" v-if="!formData.userId">
              <a-input-group compact style="display: flex">
                <a-input-password v-model:value="formData.passwordHash" />
                <a-button @click="handleRandomPassword">
                  <ReloadOutlined />
                </a-button>
              </a-input-group>
            </a-form-item>
            <a-form-item label="账户状态" name="accountStatus">
              <a-select v-model:value="formData.accountStatus">
                <a-select-option :value="1">正常</a-select-option>
                <a-select-option :value="0">禁用</a-select-option>
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
import { getUserList, registerUser, updateUser, logoutUser } from '@/api/user'
import type { FormInstance } from 'ant-design-vue'
import type { PageResult, User } from "@/types/api"
import humps from "humps"
import { generateNickname, generatePassword } from "@/utils"

const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref('新增用户')
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
  {
    title: '用户ID',
    dataIndex: 'userId',
    key: 'userId',
    width: 100
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '账户状态',
    key: 'accountStatus',
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 180
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    fixed: 'right'
  }
]

const dataSource = ref<User[]>([])
const pagination = reactive<PaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条`,
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
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  passwordHash: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  accountStatus: [{ required: true, message: '请选择账户状态', trigger: 'change' }]
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
  modalTitle.value = '新增用户'
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {
    userId: undefined,
    username: '',
    passwordHash: '',
    accountStatus: 1
  })
  modalVisible.value = true
}

const handleEdit = (record: User): void => {
  modalTitle.value = '编辑用户'
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, record)
  modalVisible.value = true
}

const handleDelete = (record: User): void => {
  Modal.confirm({
    title: '确认注销',
    content: `确定要注销用户 "${record.username}" 吗？`,
    onOk: async () => {
      try {
        if (record.userId) {
          await logoutUser(record.userId)
          message.success('注销成功')
          await loadData()
        }
      } catch {
        message.error('注销失败')
      }
    }
  })
}

const handleSubmit = async (): Promise<void> => {
  try {
    await formRef.value?.validate()
    if (formData.userId) {
      await updateUser(formData.userId, formData)
      message.success('更新成功')
    } else {
      await registerUser(formData as User)
      message.success('注册成功')
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
