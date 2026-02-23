<template>
  <div class="role-management">
    <a-card>
      <template #title>
        <span>角色管理</span>
      </template>
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined />
          </template>
          新增角色
        </a-button>
      </template>

      <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="pagination"
        row-key="roleId"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 1 ? 'green' : 'red'">
              {{ record.status === 1 ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'isSystemRole'">
            <a-tag :color="record.isSystemRole === 1 ? 'blue' : 'default'">
              {{ record.isSystemRole === 1 ? '系统角色' : '普通角色' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">编辑</a-button>
              <a-button
                type="link"
                size="small"
                danger
                :disabled="record.isSystemRole === 1"
                @click="handleDelete(record)"
              >
                删除
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- 新增/编辑角色对话框 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      @ok="handleSubmit"
      @cancel="handleCancel"
      width="600px"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-form-item label="角色名称" name="roleName">
          <a-input v-model:value="formData.roleName" />
        </a-form-item>
        <a-form-item label="角色代码" name="roleCode">
          <a-input v-model:value="formData.roleCode" />
        </a-form-item>
        <a-form-item label="角色描述" name="roleDescription">
          <a-textarea v-model:value="formData.roleDescription" :rows="3" />
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-select v-model:value="formData.status">
            <a-select-option :value="1">启用</a-select-option>
            <a-select-option :value="0">禁用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="排序序号" name="sortOrder">
          <a-input-number v-model:value="formData.sortOrder" :min="0" style="width: 100%" />
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
import { getRoleList, createRole, updateRole, deleteRole, type Role } from '@/api/role'
import type { FormInstance } from 'ant-design-vue'

const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref('新增角色')
const formRef = ref<FormInstance>()

const columns: ColumnType[] = [
  {
    title: '角色ID',
    dataIndex: 'roleId',
    key: 'roleId',
    width: 100
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName'
  },
  {
    title: '角色代码',
    dataIndex: 'roleCode',
    key: 'roleCode'
  },
  {
    title: '角色描述',
    dataIndex: 'roleDescription',
    key: 'roleDescription'
  },
  {
    title: '状态',
    key: 'status',
    width: 100
  },
  {
    title: '系统角色',
    key: 'isSystemRole',
    width: 100
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    fixed: 'right'
  }
]

const dataSource = ref<Role[]>([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条`,
  showSizeChanger: true,
  showQuickJumper: true
})

const formData = reactive<Partial<Role>>({
  roleName: '',
  roleCode: '',
  roleDescription: '',
  status: 1,
  sortOrder: 0
})

const rules = {
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  roleCode: [{ required: true, message: '请输入角色代码', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const response = await getRoleList({
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
  modalTitle.value = '新增角色'
  Object.assign(formData, {
    roleId: undefined,
    roleName: '',
    roleCode: '',
    roleDescription: '',
    status: 1,
    sortOrder: 0
  })
  modalVisible.value = true
}

// 编辑
const handleEdit = (record: Role) => {
  modalTitle.value = '编辑角色'
  Object.assign(formData, record)
  modalVisible.value = true
}

// 删除
const handleDelete = (record: Role) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除角色 "${record.roleName}" 吗？`,
    onOk: async () => {
      try {
        if (record.roleId) {
          await deleteRole(record.roleId)
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
    if (formData.roleId) {
      // 更新
      await updateRole(formData.roleId, formData)
      message.success('更新成功')
    } else {
      // 新增
      await createRole(formData as Role)
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
.role-management {
  padding: 0;
}
</style>
