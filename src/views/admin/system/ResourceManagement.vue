<template>
  <div class="resource-management">
    <a-card>
      <template #title>
        <span>资源管理</span>
      </template>
      <template #extra>
        <a-space>
          <a-button @click="handleExpandAll">展开全部</a-button>
          <a-button @click="handleCollapseAll">收起全部</a-button>
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <PlusOutlined />
            </template>
            新增资源
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
              {{ record.status === 1 ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'resourceCategory'">
            <a-tag>{{ record.resourceCategory }}</a-tag>
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
          <a-collapse-panel key="required" header="基本信息（必填）" :force-render="true">
            <a-form-item label="资源名称" name="resourceName">
              <a-input v-model:value="formData.resourceName" />
            </a-form-item>
            <a-form-item label="资源代码" name="resourceCode">
              <a-input v-model:value="formData.resourceCode" />
            </a-form-item>
            <a-form-item label="资源描述" name="resourceDescription">
              <a-textarea v-model:value="formData.resourceDescription" :rows="3" />
            </a-form-item>
            <a-form-item label="资源类型" name="resourceCategory">
              <a-select v-model:value="formData.resourceCategory">
                <a-select-option value="CATALOG">目录</a-select-option>
                <a-select-option value="MENU">菜单</a-select-option>
                <a-select-option value="BUTTON">按钮</a-select-option>
                <a-select-option value="API">接口</a-select-option>
                <a-select-option value="PAGE">页面</a-select-option>
                <a-select-option value="MODULE">模块</a-select-option>
                <a-select-option value="OTHER">其它</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="资源路径" name="resourcePath">
              <a-input v-model:value="formData.resourcePath" />
            </a-form-item>
            <a-form-item label="父级资源" name="parentId">
              <a-select v-model:value="formData.parentId" allow-clear>
                <a-select-option :value="0">无</a-select-option>
                <a-select-option
                    v-for="item in resourceOptions"
                    :key="item.resourceId"
                    :value="item.resourceId"
                >
                  {{ item.resourceName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="资源层级" name="level">
              <a-input-number v-model:value="formData.level" :min="0" :max="100" />
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
            <a-form-item label="创建人用户ID" name="createBy">
              <a-input v-model:value="formData.createBy" :disabled="isEditMode" />
            </a-form-item>
            <a-form-item label="更新人用户ID" name="updateBy">
              <a-input v-model:value="formData.updateBy" :disabled="!!userStore.currentUserId" />
            </a-form-item>
          </a-collapse-panel>

          <a-collapse-panel key="optional" header="扩展信息（选填）">
            <a-form-item label="组件路径" name="resourceComponent">
              <a-input v-model:value="formData.resourceComponent" />
            </a-form-item>
            <a-form-item label="资源图标" name="resourceIcon">
              <a-input v-model:value="formData.resourceIcon" />
            </a-form-item>
            <a-form-item label="是否可见" name="visible">
              <a-select v-model:value="formData.visible">
                <a-select-option :value="1">可见</a-select-option>
                <a-select-option :value="0">隐藏</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="是否系统内置资源" name="isSystem">
              <a-select v-model:value="formData.isSystem">
                <a-select-option :value="1">是</a-select-option>
                <a-select-option :value="0">否</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="权限标识" name="permissionFlag">
              <a-input v-model:value="formData.permissionFlag" />
            </a-form-item>
            <a-form-item label="是否需要认证" name="requiresAuth">
              <a-select v-model:value="formData.requiresAuth">
                <a-select-option :value="1">是</a-select-option>
                <a-select-option :value="0">否</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="是否缓存页面" name="keepAlive">
              <a-select v-model:value="formData.keepAlive">
                <a-select-option :value="1">是</a-select-option>
                <a-select-option :value="0">否</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="是否外部链接" name="externalLink">
              <a-select v-model:value="formData.externalLink">
                <a-select-option :value="1">是</a-select-option>
                <a-select-option :value="0">否</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="链接打开方式" name="target">
              <a-select v-model:value="formData.target">
                <a-select-option value="_self">_self</a-select-option>
                <a-select-option value="_blank">_blank</a-select-option>
                <a-select-option value="_parent">_parent</a-select-option>
                <a-select-option value="_top">_top</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="徽章内容" name="badge">
              <a-input v-model:value="formData.badge" />
            </a-form-item>
            <a-form-item label="徽章类型" name="badgeType">
              <a-select v-model:value="formData.badgeType">
                <a-select-option value="danger">danger</a-select-option>
                <a-select-option value="warning">warning</a-select-option>
                <a-select-option value="success">success</a-select-option>
                <a-select-option value="info">info</a-select-option>
                <a-select-option value="primary">primary</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="元数据(JSON)" name="metaJson">
              <a-textarea v-model:value="formData.metaJson" :rows="3" />
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { ColumnType } from 'ant-design-vue/es/table'
import {
  getResourceList,
  createResource,
  updateResource,
  deleteResource,
  type Resource
} from '@/api/resource'
import type { FormInstance } from 'ant-design-vue'
import type {PageResult} from "@/types/api";
import humps from "humps";
import {useUserStore} from "@/stores/user";

const userStore = useUserStore()
const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref('新增资源')
const modalCollapseActiveKey = ref<string[]>(['required'])
const formRef = ref<FormInstance>()
const expandedRowKeys = ref<number[]>([])

const isEditMode = computed(() => !!formData.resourceId)

const columns: ColumnType[] = [
  {
    title: '资源名称',
    dataIndex: 'resourceName',
    key: 'resourceName'
  },
  {
    title: '资源代码',
    dataIndex: 'resourceCode',
    key: 'resourceCode'
  },
  {
    title: '资源类型',
    key: 'resourceCategory',
    width: 100
  },
  {
    title: '排序序号',
    dataIndex: 'sortOrder',
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
  resourceName: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
  resourceCategory: [{ required: true, message: '请选择资源类型', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
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
    message.error('加载数据失败')
  } finally {
    loading.value = false
  }
}

const buildTree = (resources: Resource[]): Resource[] => {
  const map = new Map<number, Resource & { children?: Resource[] }>()
  const roots: Resource[] = []

  resources.forEach((resource) => {
    map.set(resource.resourceId!, { ...resource, children: [] })
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
  modalTitle.value = '新增资源'
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
  modalTitle.value = '编辑资源'
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, { ...record, createBy: record.createBy, updateBy: userStore.currentUserId })
  modalVisible.value = true
}

const handleDelete = (record: Resource): void => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除资源 "${record.resourceName}" 吗？`,
    onOk: async () => {
      try {
        if (record.resourceId) {
          await deleteResource(record.resourceId)
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
    if (formData.resourceId) {
      await updateResource(formData.resourceId, formData)
      message.success('更新成功')
    } else {
      await createResource(formData)
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
