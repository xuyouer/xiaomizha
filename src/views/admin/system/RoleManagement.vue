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
          <template v-if="column.key === 'roleId'">
            <a-tag>
              {{ record.roleId }}
            </a-tag>
          </template>
          <template v-if="column.key === 'roleName'">
            <a-tag>
              {{ record.roleName }}
            </a-tag>
          </template>
          <template v-if="column.key === 'roleCode'">
            <a-tag>
              {{ record.roleCode }}
            </a-tag>
          </template>
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
          <template v-if="column.key === 'isDefault'">
            <a-tag :color="record.isDefault === 1 ? 'blue' : 'default'">
              {{ record.isDefault === 1 ? '是' : '否' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'sortOrder'">
            <a-tag>
              {{ record.sortOrder }}
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
        <a-collapse v-model:activeKey="modalCollapseActiveKey">
          <a-collapse-panel key="required" header="基本信息（必填）" :force-render="true">
            <a-form-item label="角色名称" name="roleName">
              <a-input v-model:value="formData.roleName" />
            </a-form-item>
            <a-form-item label="角色代码" name="roleCode">
              <a-input v-model:value="formData.roleCode" />
            </a-form-item>
            <a-form-item label="角色描述" name="roleDescription">
              <a-textarea v-model:value="formData.roleDescription" :rows="3" />
            </a-form-item>
            <a-form-item label="排序序号" name="sortOrder">
              <a-input-number v-model:value="formData.sortOrder" :min="0" :max="100" />
            </a-form-item>
            <a-form-item label="状态" name="status">
              <a-select v-model:value="formData.status">
                <a-select-option :value="1">启用</a-select-option>
                <a-select-option :value="0">禁用</a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>

          <a-collapse-panel key="optional" header="扩展信息（选填）">
            <a-form-item label="系统角色" name="isSystemRole">
              <a-select v-model:value="formData.isSystemRole">
                <a-select-option :value="1">系统角色</a-select-option>
                <a-select-option :value="0">普通角色</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="默认角色" name="isDefault">
              <a-select v-model:value="formData.isDefault">
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
import { getRoleList, createRole, updateRole, deleteRole, type Role } from '@/api/role'
import type { FormInstance } from 'ant-design-vue'
import type {PageResult, UserRoles} from "@/types/api"
import humps from "humps";

const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref('新增角色')
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
    title: '系统角色',
    key: 'isSystemRole',
    width: 100
  },
  {
    title: '默认角色',
    key: 'isDefault',
    width: 100
  },
  {
    title: '排序序号',
    key: 'sortOrder',
    width: 100
  },
  {
    title: '状态',
    key: 'status',
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
const pagination = reactive<PaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条`,
  showSizeChanger: true,
  showQuickJumper: true
})

const formData = reactive({
  roleId: undefined as number | undefined,
  roleName: '',
  roleCode: '',
  roleDescription: '',
  isSystemRole: 0,
  isDefault: 0,
  sortOrder: 0,
  status: 1,
})

const rules = {
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getRoleList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    let {data} = response
    if (data.code === 200 && data.data) {
      data = humps.camelizeKeys(data) as PageResult<UserRoles>
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
  modalTitle.value = '新增角色'
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {
    roleId: undefined,
    roleName: '',
    roleCode: '',
    roleDescription: '',
    isSystemRole: 0,
    isDefault: 0,
    sortOrder: 0,
    status: 1,
  })
  modalVisible.value = true
}

const handleEdit = (record: Role): void => {
  modalTitle.value = '编辑角色'
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, record)
  modalVisible.value = true
}

const handleDelete = (record: Role): void => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除角色 "${record.roleName}" 吗？`,
    onOk: async () => {
      try {
        if (record.roleId) {
          await deleteRole(record.roleId)
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
    if (formData.roleId) {
      await updateRole(formData.roleId, formData)
      message.success('更新成功')
    } else {
      await createRole(formData as Role)
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
