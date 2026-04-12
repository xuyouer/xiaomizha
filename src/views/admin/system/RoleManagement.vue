<template>
  <div class="role-management">
    <a-card>
      <template #title>
        <span>{{ t('role.management.title') }}</span>
      </template>
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined/>
          </template>
          {{ t('role.management.addRole') }}
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
              {{ record.status === 1 ? t('role.common.enabled') : t('role.common.disabled') }}
            </a-tag>
          </template>
          <template v-if="column.key === 'isSystemRole'">
            <a-tag :color="record.isSystemRole === 1 ? 'blue' : 'default'">
              {{ record.isSystemRole === 1 ? t('role.common.systemRole') : t('role.common.normalRole') }}
            </a-tag>
          </template>
          <template v-if="column.key === 'isDefault'">
            <a-tag :color="record.isDefault === 1 ? 'blue' : 'default'">
              {{ record.isDefault === 1 ? t('role.common.yes') : t('role.common.no') }}
            </a-tag>
          </template>
          <template v-if="column.key === 'sortOrder'">
            <a-tag>
              {{ record.sortOrder }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">{{ t('role.management.edit') }}</a-button>
              <a-button
                  type="link"
                  size="small"
                  danger
                  :disabled="record.isSystemRole === 1"
                  @click="handleDelete(record)"
              >
                {{ t('role.management.delete') }}
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <FormDrawer
        ref="modalRef"
        v-model:open="modalVisible"
        :title="modalTitle"
        :model-value="formData"
        :rules="rules"
        :required-header="t('role.management.form.basicInfo')"
        :optional-header="t('role.management.form.extraInfo')"
        @ok="handleSubmit"
        @cancel="handleCancel"
    >
      <template #required>
        <a-form-item :label="t('role.management.form.roleName')" name="roleName">
          <a-input v-model:value="formData.roleName"/>
        </a-form-item>
        <a-form-item :label="t('role.management.form.roleCode')" name="roleCode">
          <a-input v-model:value="formData.roleCode"/>
        </a-form-item>
        <a-form-item :label="t('role.management.form.roleDescription')" name="roleDescription">
          <a-textarea v-model:value="formData.roleDescription" :rows="3"/>
        </a-form-item>
        <a-form-item :label="t('role.management.form.sortOrder')" name="sortOrder">
          <a-input-number v-model:value="formData.sortOrder" :min="0" :max="100"/>
        </a-form-item>
        <a-form-item :label="t('role.management.form.status')" name="status">
          <a-select v-model:value="formData.status">
            <a-select-option :value="1">{{ t('role.common.enabled') }}</a-select-option>
            <a-select-option :value="0">{{ t('role.common.disabled') }}</a-select-option>
          </a-select>
        </a-form-item>
      </template>

      <template #optional>
        <a-form-item :label="t('role.management.form.isSystemRole')" name="isSystemRole">
          <a-select v-model:value="formData.isSystemRole">
            <a-select-option :value="1">{{ t('role.common.systemRole') }}</a-select-option>
            <a-select-option :value="0">{{ t('role.common.normalRole') }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="t('role.management.form.isDefault')" name="isDefault">
          <a-select v-model:value="formData.isDefault">
            <a-select-option :value="1">{{ t('role.common.yes') }}</a-select-option>
            <a-select-option :value="0">{{ t('role.common.no') }}</a-select-option>
          </a-select>
        </a-form-item>
      </template>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted, computed} from 'vue'
import {message, Modal} from 'ant-design-vue'
import {PlusOutlined} from '@ant-design/icons-vue'
import type {ColumnType} from 'ant-design-vue/es/table'
import type {TablePaginationConfig} from 'ant-design-vue/es/table'
import {getRoleList, createRole, updateRole, deleteRole} from '@/api'
import type {PageResult, Role} from "@/types"
import humps from "humps"
import {useI18n} from 'vue-i18n'
import FormDrawer from '@/components/FormDrawer.vue'
import {usePaginationConfig} from '@/utils'

const {t} = useI18n()

const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref(t('role.management.addRole'))
const modalRef = ref<InstanceType<typeof FormDrawer>>()

const columns = computed<ColumnType[]>(() => [
  {
    title: t('role.management.columns.roleId'),
    dataIndex: 'roleId',
    key: 'roleId',
    width: 100
  },
  {
    title: t('role.management.columns.roleName'),
    dataIndex: 'roleName',
    key: 'roleName'
  },
  {
    title: t('role.management.columns.roleCode'),
    dataIndex: 'roleCode',
    key: 'roleCode'
  },
  {
    title: t('role.management.columns.roleDescription'),
    dataIndex: 'roleDescription',
    key: 'roleDescription'
  },
  {
    title: t('role.management.columns.isSystemRole'),
    key: 'isSystemRole',
    width: 100,
    align: 'center'
  },
  {
    title: t('role.management.columns.isDefault'),
    key: 'isDefault',
    width: 100,
    align: 'center'
  },
  {
    title: t('role.management.columns.sortOrder'),
    key: 'sortOrder',
    width: 100
  },
  {
    title: t('role.management.columns.status'),
    key: 'status',
    width: 100,
    align: 'center'
  },
  {
    title: t('role.management.columns.action'),
    key: 'action',
    width: 150,
    fixed: 'right'
  }
])

const dataSource = ref<Role[]>([])
const pagination = reactive(usePaginationConfig('role.management.pagination.total').value)

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
  roleName: [{required: true, message: t('role.management.form.validate.roleName'), trigger: 'blur'}],
  status: [{required: true, message: t('role.management.form.validate.status'), trigger: 'change'}]
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
      data = humps.camelizeKeys(data) as PageResult<Role>
      dataSource.value = data.data || []
      pagination.total = data.total || 0
      pagination.current = data.current || 1
      pagination.pageSize = data.pageSize || 10
    }
  } catch {
    message.error(t('role.management.messages.loadFailed'))
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
  modalTitle.value = t('role.management.addRole')
  if (modalRef.value) {
    modalRef.value.collapseActiveKey = ['required']
  }
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
  modalTitle.value = t('role.management.editRole')
  if (modalRef.value) {
    modalRef.value.collapseActiveKey = ['required']
  }
  Object.assign(formData, record)
  modalVisible.value = true
}

const handleDelete = (record: Role): void => {
  Modal.confirm({
    title: t('role.management.confirm.delete.title'),
    content: t('role.management.confirm.delete.content', {roleName: record.roleName}),
    onOk: async () => {
      try {
        if (record.roleId) {
          await deleteRole(record.roleId)
          message.success(t('role.management.messages.deleteSuccess'))
          await loadData()
        }
      } catch {
        message.error(t('role.management.messages.deleteFailed'))
      }
    }
  })
}

const handleSubmit = async (): Promise<void> => {
  try {
    await modalRef.value?.validate()
    if (formData.roleId) {
      await updateRole(formData.roleId, formData)
      message.success(t('role.management.messages.updateSuccess'))
    } else {
      await createRole(formData as Role)
      message.success(t('role.management.messages.createSuccess'))
    }
    modalVisible.value = false
    await loadData()
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

const handleCancel = (): void => {
  modalVisible.value = false
  modalRef.value?.resetFields()
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>

</style>
