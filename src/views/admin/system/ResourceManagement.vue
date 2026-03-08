<template>
  <div class="resource-management">
    <a-card>
      <template #title>
        <span>{{ t('resource.management.title') }}</span>
      </template>
      <template #extra>
        <a-space>
          <a-button @click="handleExpandAll">{{ t('resource.management.expandAll') }}</a-button>
          <a-button @click="handleCollapseAll">{{ t('resource.management.collapseAll') }}</a-button>
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <PlusOutlined/>
            </template>
            {{ t('resource.management.addResource') }}
          </a-button>
        </a-space>
      </template>

      <a-table
          :columns="columns"
          :data-source="dataSource"
          :loading="loading"
          :pagination="false"
          :expandable="{ expandedRowKeys, onExpand }"
          row-key="resourceId"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'resourceName'">
            <a-tag>
              {{ record.resourceName }}
            </a-tag>
          </template>
          <template v-if="column.key === 'resourceCode'">
            <a-tag>
              {{ record.resourceCode }}
            </a-tag>
          </template>
          <template v-if="column.key === 'sortOrder'">
            <a-tag>
              {{ record.sortOrder }}
            </a-tag>
          </template>
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 1 ? 'green' : 'red'">
              {{ record.status === 1 ? t('resource.common.enabled') : t('resource.common.disabled') }}
            </a-tag>
          </template>
          <template v-if="column.key === 'resourceCategory'">
            <a-tag>{{ record.resourceCategory }}</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">{{
                  t('resource.management.edit')
                }}
              </a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record)">{{
                  t('resource.management.delete')
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
        width="800px"
    >
      <a-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
      >
        <a-collapse v-model:activeKey="modalCollapseActiveKey">
          <a-collapse-panel key="required" :header="t('resource.management.form.basicInfo')" :force-render="true">
            <a-form-item :label="t('resource.management.form.resourceName')" name="resourceName">
              <a-input v-model:value="formData.resourceName"/>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.resourceCode')" name="resourceCode">
              <a-input v-model:value="formData.resourceCode"/>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.resourceDescription')" name="resourceDescription">
              <a-textarea v-model:value="formData.resourceDescription" :rows="3"/>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.resourceCategory')" name="resourceCategory">
              <a-select v-model:value="formData.resourceCategory">
                <a-select-option value="CATALOG">{{ t('resource.management.form.catalog') }}</a-select-option>
                <a-select-option value="MENU">{{ t('resource.management.form.menu') }}</a-select-option>
                <a-select-option value="BUTTON">{{ t('resource.management.form.button') }}</a-select-option>
                <a-select-option value="API">{{ t('resource.management.form.api') }}</a-select-option>
                <a-select-option value="PAGE">{{ t('resource.management.form.page') }}</a-select-option>
                <a-select-option value="MODULE">{{ t('resource.management.form.module') }}</a-select-option>
                <a-select-option value="OTHER">{{ t('resource.management.form.other') }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.resourcePath')" name="resourcePath">
              <a-input v-model:value="formData.resourcePath"/>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.parentId')" name="parentId">
              <a-select v-model:value="formData.parentId" allow-clear>
                <a-select-option :value="0">{{ t('resource.management.form.none') }}</a-select-option>
                <a-select-option
                    v-for="item in resourceOptions"
                    :key="item.resourceId"
                    :value="item.resourceId"
                >
                  {{ item.resourceName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.level')" name="level">
              <a-input-number v-model:value="formData.level" :min="0" :max="100"/>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.sortOrder')" name="sortOrder">
              <a-input-number v-model:value="formData.sortOrder" :min="0" :max="100"/>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.status')" name="status">
              <a-select v-model:value="formData.status">
                <a-select-option :value="1">{{ t('resource.common.enabled') }}</a-select-option>
                <a-select-option :value="0">{{ t('resource.common.disabled') }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.createBy')" name="createBy">
              <a-input v-model:value="formData.createBy" :disabled="isEditMode"/>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.updateBy')" name="updateBy">
              <a-input v-model:value="formData.updateBy" :disabled="!!userStore.currentUserId"/>
            </a-form-item>
          </a-collapse-panel>

          <a-collapse-panel key="optional" :header="t('resource.management.form.extraInfo')">
            <a-form-item :label="t('resource.management.form.resourceComponent')" name="resourceComponent">
              <a-input v-model:value="formData.resourceComponent"/>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.resourceIcon')" name="resourceIcon">
              <a-input v-model:value="formData.resourceIcon"/>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.visible')" name="visible">
              <a-select v-model:value="formData.visible">
                <a-select-option :value="1">{{ t('resource.common.visible') }}</a-select-option>
                <a-select-option :value="0">{{ t('resource.common.hidden') }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.isSystem')" name="isSystem">
              <a-select v-model:value="formData.isSystem">
                <a-select-option :value="1">{{ t('resource.common.yes') }}</a-select-option>
                <a-select-option :value="0">{{ t('resource.common.no') }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.permissionFlag')" name="permissionFlag">
              <a-input v-model:value="formData.permissionFlag"/>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.requiresAuth')" name="requiresAuth">
              <a-select v-model:value="formData.requiresAuth">
                <a-select-option :value="1">{{ t('resource.common.yes') }}</a-select-option>
                <a-select-option :value="0">{{ t('resource.common.no') }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.keepAlive')" name="keepAlive">
              <a-select v-model:value="formData.keepAlive">
                <a-select-option :value="1">{{ t('resource.common.yes') }}</a-select-option>
                <a-select-option :value="0">{{ t('resource.common.no') }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.externalLink')" name="externalLink">
              <a-select v-model:value="formData.externalLink">
                <a-select-option :value="1">{{ t('resource.common.yes') }}</a-select-option>
                <a-select-option :value="0">{{ t('resource.common.no') }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.target')" name="target">
              <a-select v-model:value="formData.target">
                <a-select-option value="_self">_self</a-select-option>
                <a-select-option value="_blank">_blank</a-select-option>
                <a-select-option value="_parent">_parent</a-select-option>
                <a-select-option value="_top">_top</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.badge')" name="badge">
              <a-input v-model:value="formData.badge"/>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.badgeType')" name="badgeType">
              <a-select v-model:value="formData.badgeType">
                <a-select-option value="danger">danger</a-select-option>
                <a-select-option value="warning">warning</a-select-option>
                <a-select-option value="success">success</a-select-option>
                <a-select-option value="info">info</a-select-option>
                <a-select-option value="primary">primary</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="t('resource.management.form.metaJson')" name="metaJson">
              <a-textarea v-model:value="formData.metaJson" :rows="3"/>
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
import {
  getResourceList,
  createResource,
  updateResource,
  deleteResource
} from '@/api'
import type {FormInstance} from 'ant-design-vue'
import type {PageResult, Resource} from "@/types/api"
import humps from "humps"
import {useUserStore} from "@/stores/user"
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const userStore = useUserStore()
const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref(t('resource.management.addResource'))
const modalCollapseActiveKey = ref<string[]>(['required'])
const formRef = ref<FormInstance>()
const expandedRowKeys = ref<number[]>([])

const isEditMode = computed(() => !!formData.resourceId)

const columns = computed<ColumnType[]>(() => [
  {
    title: t('resource.management.columns.resourceName'),
    dataIndex: 'resourceName',
    key: 'resourceName'
  },
  {
    title: t('resource.management.columns.resourceCode'),
    dataIndex: 'resourceCode',
    key: 'resourceCode'
  },
  {
    title: t('resource.management.columns.resourceCategory'),
    key: 'resourceCategory',
    width: 100
  },
  {
    title: t('resource.management.columns.sortOrder'),
    dataIndex: 'sortOrder',
    key: 'sortOrder',
    width: 100
  },
  {
    title: t('resource.management.columns.status'),
    key: 'status',
    width: 100
  },
  {
    title: t('resource.management.columns.action'),
    key: 'action',
    width: 150,
    fixed: 'right'
  }
])

const dataSource = ref<Resource[]>([])
const resourceOptions = ref<Resource[]>([])

const RESOURCE_CATEGORIES = ['CATALOG', 'MENU', 'BUTTON', 'API', 'PAGE', 'MODULE', 'OTHER'] as const

const formData = reactive<Resource>({
  resourceId: undefined as number | undefined,
  resourceName: '',
  resourceCode: '',
  resourceDescription: '',
  resourceCategory: 'MENU',
  resourcePath: '',
  resourceComponent: '',
  resourceIcon: '',
  parentId: undefined as number | undefined,
  level: 1,
  sortOrder: 0,
  status: 1,
  visible: 1,
  isSystem: 0,
  permissionFlag: '',
  requiresAuth: 1,
  keepAlive: undefined as number | undefined,
  externalLink: 0,
  target: '_self',
  badge: '',
  badgeType: 'danger',
  metaJson: '',
  createBy: undefined as number | undefined,
  updateBy: undefined as number | undefined,
})

const rules = {
  resourceName: [{required: true, message: t('resource.management.form.validate.resourceName'), trigger: 'blur'}],
  resourceCategory: [{
    required: true,
    message: t('resource.management.form.validate.resourceCategory'),
    trigger: 'change'
  }],
  status: [{required: true, message: t('resource.management.form.validate.status'), trigger: 'change'}]
}

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getResourceList({
      current: 1,
      pageSize: 1000
    })
    let {data} = response
    if (data?.code === 200 && data?.data) {
      data = humps.camelizeKeys(data) as PageResult<Resource>
      const resources = data.data || []
      dataSource.value = buildTree(resources)
      resourceOptions.value = resources.filter((r) =>
          RESOURCE_CATEGORIES.includes((r.resourceCategory ?? '') as (typeof RESOURCE_CATEGORIES)[number])
      )
    }
  } catch {
    message.error(t('resource.management.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

const buildTree = (resources: Resource[]): Resource[] => {
  const map = new Map<number, Resource & { children?: Resource[] }>()
  const roots: Resource[] = []

  resources.forEach((resource) => {
    map.set(resource.resourceId!, {...resource, children: []})
  })

  resources.forEach((resource) => {
    const node = map.get(resource.resourceId!)
    if (resource.parentId === 0 || !resource.parentId) {
      roots.push(node!)
    } else {
      const parent = map.get(resource.parentId)
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(node!)
      }
    }
  })

  return roots
}

const onExpand = (expanded: boolean, record: Resource): void => {
  if (expanded) {
    expandedRowKeys.value.push(record.resourceId!)
  } else {
    const index = expandedRowKeys.value.indexOf(record.resourceId!)
    if (index > -1) {
      expandedRowKeys.value.splice(index, 1)
    }
  }
}

const handleExpandAll = (): void => {
  const getAllIds = (resources: Resource[]): number[] => {
    let ids: number[] = []
    resources.forEach((r) => {
      ids.push(r.resourceId!)
      if ((r as Resource & { children?: Resource[] }).children) {
        ids = ids.concat(getAllIds((r as Resource & { children?: Resource[] }).children!))
      }
    })
    return ids
  }
  expandedRowKeys.value = getAllIds(dataSource.value)
}

const handleCollapseAll = (): void => {
  expandedRowKeys.value = []
}

const handleAdd = (): void => {
  modalTitle.value = t('resource.management.addResource')
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {
    resourceId: undefined,
    resourceName: '',
    resourceCode: '',
    resourceDescription: '',
    resourceCategory: 'MENU',
    resourcePath: '',
    resourceComponent: '',
    resourceIcon: '',
    parentId: undefined,
    level: 1,
    sortOrder: 0,
    status: 1,
    visible: 1,
    isSystem: 0,
    permissionFlag: '',
    requiresAuth: 1,
    keepAlive: undefined,
    externalLink: 0,
    target: '_self',
    badge: '',
    badgeType: 'danger',
    metaJson: '',
    createBy: userStore.currentUserId,
    updateBy: userStore.currentUserId
  })
  modalVisible.value = true
}

const handleEdit = (record: Resource): void => {
  modalTitle.value = t('resource.management.editResource')
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {...record, createBy: record.createBy, updateBy: userStore.currentUserId})
  modalVisible.value = true
}

const handleDelete = (record: Resource): void => {
  Modal.confirm({
    title: t('resource.management.confirm.delete.title'),
    content: t('resource.management.confirm.delete.content', {resourceName: record.resourceName}),
    onOk: async () => {
      try {
        if (record.resourceId) {
          await deleteResource(record.resourceId)
          message.success(t('resource.management.messages.deleteSuccess'))
          await loadData()
        }
      } catch {
        message.error(t('resource.management.messages.deleteFailed'))
      }
    }
  })
}

const handleSubmit = async (): Promise<void> => {
  try {
    await formRef.value?.validate()
    if (formData.resourceId) {
      await updateResource(formData.resourceId, formData)
      message.success(t('resource.management.messages.updateSuccess'))
    } else {
      await createResource(formData)
      message.success(t('resource.management.messages.createSuccess'))
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
