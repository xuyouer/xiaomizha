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
          <template v-if="column.key === 'accountStatus'">
            <a-tag :color="record.accountStatus === 1 ? 'green' : 'red'">
              {{ record.accountStatus === 1 ? '正常' : '禁用' }}
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

    <!-- 新增/编辑用户对话框 -->
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
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="formData.username" :disabled="!!formData.userId" />
        </a-form-item>
        <a-form-item label="密码" name="passwordHash" v-if="!formData.userId">
          <a-input-password v-model:value="formData.passwordHash" />
        </a-form-item>
        <a-form-item label="账户状态" name="accountStatus">
          <a-select v-model:value="formData.accountStatus">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="0">禁用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { ColumnType } from 'ant-design-vue/es/table'
import { getUserList, createUser, updateUser, deleteUser, type User } from '@/api/user'
import type { FormInstance } from 'ant-design-vue'

const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref('新增用户')
const formRef = ref<FormInstance>()

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
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条`,
  showSizeChanger: true,
  showQuickJumper: true
})

const formData = reactive<Partial<User>>({
  username: '',
  passwordHash: '',
  accountStatus: 1
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  passwordHash: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  accountStatus: [{ required: true, message: '请选择账户状态', trigger: 'change' }]
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const response = await getUserList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    if (response.code === 200 && response.data) {
      dataSource.value = response.data.records || []
      pagination.total = response.data.total || 0
    }
  } catch (error) {
    message.error('加载数据失败')
  } finally {
    loading.value = false
  }
}

// 表格变化处理
const handleTableChange = (pag: any) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  loadData()
}

// 新增
const handleAdd = () => {
  modalTitle.value = '新增用户'
  Object.assign(formData, {
    userId: undefined,
    username: '',
    passwordHash: '',
    accountStatus: 1
  })
  modalVisible.value = true
}

// 编辑
const handleEdit = (record: User) => {
  modalTitle.value = '编辑用户'
  Object.assign(formData, record)
  modalVisible.value = true
}

// 删除
const handleDelete = (record: User) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除用户 "${record.username}" 吗？`,
    onOk: async () => {
      try {
        if (record.userId) {
          await deleteUser(record.userId)
          message.success('删除成功')
          loadData()
        }
      } catch (error) {
        message.error('删除失败')
      }
    }
  })
}

// 提交
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    if (formData.userId) {
      // 更新
      await updateUser(formData.userId, formData)
      message.success('更新成功')
    } else {
      // 新增
      await createUser(formData as User)
      message.success('新增成功')
    }
    modalVisible.value = false
    loadData()
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 取消
const handleCancel = () => {
  modalVisible.value = false
  formRef.value?.resetFields()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.user-management {
  padding: 0;
}
</style>
