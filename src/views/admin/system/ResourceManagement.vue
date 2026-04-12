<script setup lang="ts">
import {ref, reactive, onMounted, computed} from 'vue'
import {message, Modal} from 'ant-design-vue'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import {
  getResourceList,
  createResource,
  updateResource,
  deleteResource
} from '@/api'
import type {PageResult, Resource} from "@/types"
import humps from "humps"
import {useUserStore} from "@/stores/user"
import {useI18n} from 'vue-i18n'
import FormDrawer from "@/components/FormDrawer.vue"

const {t} = useI18n()

const userStore = useUserStore()
const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref(t('resource.management.addResource'))
const modalRef = ref<InstanceType<typeof FormDrawer>>()
const expandedKeys = ref<number[]>([])

const isEditMode = computed(() => !!formData.resourceId)

const dataSource = ref<Resource[]>([])
const resourceOptions = ref<Resource[]>([])

const RESOURCE_CATEGORIES = computed(() => [
  {value: 'CATALOG', label: t('resource.management.form.catalog')},
  {value: 'MENU', label: t('resource.management.form.menu')},
  {value: 'PAGE', label: t('resource.management.form.page')},
  {value: 'BUTTON', label: t('resource.management.form.button')},
  {value: 'API', label: t('resource.management.form.api')},
  {value: 'MODULE', label: t('resource.management.form.module')},
  {value: 'OTHER', label: t('resource.management.form.other')}
])

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

interface TreeData {
  key: number
  title: string
  resourceId: number
  resourceName: string
  resourceCode: string
  resourceCategory: string
  status: number
  sortOrder: number
  children?: TreeData[]
}

const treeData = ref<TreeData[]>([])


const buildTreeData = (resources: Resource[]): TreeData[] => {
  const map = new Map<number, TreeData>()
  const roots: TreeData[] = []

  resources.forEach((resource) => {
    if (resource.resourceId) {
      map.set(resource.resourceId, {
        key: resource.resourceId,
        title: resource.resourceName || '',
        resourceId: resource.resourceId,
        resourceName: resource.resourceName || '',
        resourceCode: resource.resourceCode || '',
        resourceCategory: resource.resourceCategory || '',
        status: resource.status || 0,
        sortOrder: resource.sortOrder || 0,
        children: []
      })
    }
  })

  resources.forEach((resource) => {
    const node = map.get(resource.resourceId!)
    if (!node) return

    if (resource.parentId === 0 || !resource.parentId) {
      roots.push(node)
    } else {
      const parent = map.get(resource.parentId)
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(node)
      }
    }
  })

  return roots
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
      dataSource.value = resources
      treeData.value = buildTreeData(resources)
      resourceOptions.value = resources.filter((r) =>
          RESOURCE_CATEGORIES.value.some(cat => cat.value === r.resourceCategory)
      )
    }
  } catch {
    message.error(t('resource.management.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleExpandAll = (): void => {
  const getAllIds = (nodes: TreeData[]): number[] => {
    let ids: number[] = []
    nodes.forEach((node) => {
      ids.push(node.resourceId)
      if (node.children && node.children.length > 0) {
        ids = ids.concat(getAllIds(node.children))
      }
    })
    return ids
  }
  expandedKeys.value = getAllIds(treeData.value)
}

const handleCollapseAll = (): void => {
  expandedKeys.value = []
}

const onSelect = (keys: number[]): void => {
  if (keys.length > 0) {
    const selectedId = keys[0]
    if (selectedId === undefined) return
    const resource = findResourceById(selectedId)
    if (resource) {
      Object.assign(formData, {...resource})
      modalTitle.value = t('resource.management.editResource')
      modalVisible.value = true
    }
  }
}

const findResourceById = (id: number): Resource | undefined => {
  return dataSource.value.find(r => r.resourceId === id)
}

const handleAdd = (): void => {
  modalTitle.value = t('resource.management.addResource')
  if (modalRef.value) {
    modalRef.value.collapseActiveKey = ['required']
  }
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

const handleEdit = (resourceId: number): void => {
  const resource = findResourceById(resourceId)
  if (resource) {
    modalTitle.value = t('resource.management.editResource')
    if (modalRef.value) {
      modalRef.value.collapseActiveKey = ['required']
    }
    Object.assign(formData, {...resource, createBy: resource.createBy, updateBy: userStore.currentUserId})
    modalVisible.value = true
  }
}

const handleDelete = (resourceId: number, resourceName: string): void => {
  Modal.confirm({
    title: t('resource.management.confirm.delete.title'),
    content: t('resource.management.confirm.delete.content', {resourceName}),
    onOk: async () => {
      try {
        await deleteResource(resourceId)
        message.success(t('resource.management.messages.deleteSuccess'))
        await loadData()
      } catch {
        message.error(t('resource.management.messages.deleteFailed'))
      }
    }
  })
}

const handleSubmit = async (): Promise<void> => {
  try {
    await modalRef.value?.validate()
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
  modalRef.value?.resetFields()
}

onMounted(() => {
  loadData()
})
</script>

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

      <div class="tree-container">
        <a-spin :spinning="loading">
          <a-tree
              :tree-data="treeData"
              :expanded-keys="expandedKeys"
              :block-node="true"
              @select="onSelect"
              @expand="(keys: number[]) => expandedKeys = keys"
          >
            <template #title="node">
              <div class="tree-node">
                <span class="node-title">{{ node.title }}</span>
                <span class="node-info">
                  <a-tag :color="node.resourceCategory === 'CATALOG' ? 'orange' : 'blue'"
                         size="small">
                    {{ node.resourceCategory }}
                  </a-tag>
                  <a-tag :color="node.status === 1 ? 'green' : 'red'" size="small">
                    {{
                      node.status === 1 ? t('resource.common.enabled') : t('resource.common.disabled')
                    }}
                  </a-tag>
                  <span class="node-actions">
                    <a-button type="link" size="small" @click.stop="handleEdit(node.resourceId)">
                      <EditOutlined/>
                    </a-button>
                    <a-button type="link" size="small" danger
                              @click.stop="handleDelete(node.resourceId, node.title)">
                      <DeleteOutlined/>
                    </a-button>
                  </span>
                </span>
              </div>
            </template>
          </a-tree>
        </a-spin>
      </div>
    </a-card>

    <FormDrawer
        ref="modalRef"
        v-model:open="modalVisible"
        :title="modalTitle"
        :model-value="formData"
        :rules="rules"
        :required-header="t('resource.management.form.basicInfo')"
        :optional-header="t('resource.management.form.extraInfo')"
        @ok="handleSubmit"
        @cancel="handleCancel"
    >
      <template #required>
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
      </template>

      <template #optional>
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
      </template>
    </FormDrawer>
  </div>
</template>

<style lang="scss" scoped>

</style>
