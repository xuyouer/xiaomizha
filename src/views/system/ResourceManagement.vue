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

    <!-- 新增/编辑资源对话框 -->
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
        <a-form-item label="资源名称" name="resourceName">
          <a-input v-model:value="formData.resourceName" />
        </a-form-item>
        <a-form-item label="资源代码" name="resourceCode">
          <a-input v-model:value="formData.resourceCode" />
        </a-form-item>
        <a-form-item label="资源类型" name="resourceCategory">
          <a-select v-model:value="formData.resourceCategory">
            <a-select-option value="目录">目录</a-select-option>
            <a-select-option value="菜单">菜单</a-select-option>
            <a-select-option value="按钮">按钮</a-select-option>
            <a-select-option value="接口">接口</a-select-option>
            <a-select-option value="页面">页面</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="资源路径" name="resourcePath">
          <a-input v-model:value="formData.resourcePath" />
        </a-form-item>
        <a-form-item label="组件路径" name="resourceComponent">
          <a-input v-model:value="formData.resourceComponent" />
        </a-form-item>
        <a-form-item label="资源图标" name="resourceIcon">
          <a-input v-model:value="formData.resourceIcon" />
        </a-form-item>
        <a-form-item label="父级资源" name="parentId">
          <a-select v-model:value="formData.parentId" allow-clear>
            <a-select-option :value="0">无（顶级）</a-select-option>
            <a-select-option
              v-for="item in resourceOptions"
              :key="item.resourceId"
              :value="item.resourceId"
            >
              {{ item.resourceName }}
            </a-select-option>
          </a-select>
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
        <a-form-item label="资源描述" name="resourceDescription">
          <a-textarea v-model:value="formData.resourceDescription" :rows="3" />
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
import {
  getResourceList,
  createResource,
  updateResource,
  deleteResource,
  type Resource
} from '@/api/resource'
import type { FormInstance } from 'ant-design-vue'

const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref('新增资源')
const formRef = ref<FormInstance>()
const expandedRowKeys = ref<number[]>([])

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
    title: '资源路径',
    dataIndex: 'resourcePath',
    key: 'resourcePath'
  },
  {
    title: '状态',
    key: 'status',
    width: 100
  },
  {
    title: '排序',
    dataIndex: 'sortOrder',
    key: 'sortOrder',
    width: 80
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

const formData = reactive<Partial<Resource>>({
  resourceName: '',
  resourceCode: '',
  resourceCategory: '菜单',
  resourcePath: '',
  resourceComponent: '',
  resourceIcon: '',
  parentId: 0,
  status: 1,
  sortOrder: 0,
  resourceDescription: ''
})

const rules = {
  resourceName: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
  resourceCode: [{ required: true, message: '请输入资源代码', trigger: 'blur' }],
  resourceCategory: [{ required: true, message: '请选择资源类型', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const response = await getResourceList({
      current: 1,
      pageSize: 1000
    })
    if (response.code === 200 && response.data) {
      const resources = response.data.records || []
      dataSource.value = buildTree(resources)
      resourceOptions.value = resources.filter((r: Resource) => r.resourceCategory === '目录' || r.resourceCategory === '菜单')
    }
  } catch (error) {
    message.error('加载数据失败')
  } finally {
    loading.value = false
  }
}

// 构建树形结构
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

// 展开/收起
const onExpand = (expanded: boolean, record: Resource) => {
  if (expanded) {
    expandedRowKeys.value.push(record.resourceId!)
  } else {
    const index = expandedRowKeys.value.indexOf(record.resourceId!)
    if (index > -1) {
      expandedRowKeys.value.splice(index, 1)
    }
  }
}

// 展开全部
const handleExpandAll = () => {
  const getAllIds = (resources: Resource[]): number[] => {
    let ids: number[] = []
    resources.forEach((r) => {
      ids.push(r.resourceId!)
      if ((r as any).children) {
        ids = ids.concat(getAllIds((r as any).children))
      }
    })
    return ids
  }
  expandedRowKeys.value = getAllIds(dataSource.value)
}

// 收起全部
const handleCollapseAll = () => {
  expandedRowKeys.value = []
}

// 新增
const handleAdd = () => {
  modalTitle.value = '新增资源'
  Object.assign(formData, {
    resourceId: undefined,
    resourceName: '',
    resourceCode: '',
    resourceCategory: '菜单',
    resourcePath: '',
    resourceComponent: '',
    resourceIcon: '',
    parentId: 0,
    status: 1,
    sortOrder: 0,
    resourceDescription: ''
  })
  modalVisible.value = true
}

// 编辑
const handleEdit = (record: Resource) => {
  modalTitle.value = '编辑资源'
  Object.assign(formData, record)
  modalVisible.value = true
}

// 删除
const handleDelete = (record: Resource) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除资源 "${record.resourceName}" 吗？`,
    onOk: async () => {
      try {
        if (record.resourceId) {
          await deleteResource(record.resourceId)
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
    if (formData.resourceId) {
      // 更新
      await updateResource(formData.resourceId, formData)
      message.success('更新成功')
    } else {
      // 新增
      await createResource(formData as Resource)
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
.resource-management {
  padding: 0;
}
</style>
