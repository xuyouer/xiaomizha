<template>
  <div class="vip-level-config-management">
    <a-card>
      <template #title>
        <span>VIP等级配置</span>
      </template>
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined />
          </template>
          新增
        </a-button>
      </template>

      <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="pagination"
        row-key="levelId"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'levelId'">
            <a-tag>{{ record.levelId }}</a-tag>
          </template>
          <template v-if="column.key === 'vipLevel'">
            <a-tag color="blue">{{ record.vipLevel }}</a-tag>
          </template>
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 1 ? 'green' : 'red'">
              {{ record.status === 1 ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'createdAt'">
            <a-tag>{{ record.createdAt }}</a-tag>
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
      :width="560"
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
            <a-form-item label="VIP等级" name="vipLevel">
              <a-input-number v-model:value="formData.vipLevel" style="width: 100%" :min="0" />
            </a-form-item>
            <a-form-item label="等级名称" name="levelName">
              <a-input v-model:value="formData.levelName" />
            </a-form-item>
            <a-form-item label="最小成长值" name="minPoints">
              <a-input-number v-model:value="formData.minPoints" style="width: 100%" :min="0" />
            </a-form-item>
            <a-form-item label="最大成长值" name="maxPoints">
              <a-input-number v-model:value="formData.maxPoints" style="width: 100%" :min="0" placeholder="空表示无上限" />
            </a-form-item>
            <a-form-item label="每日上限" name="dailyPointsLimit">
              <a-input-number v-model:value="formData.dailyPointsLimit" style="width: 100%" :min="0" />
            </a-form-item>
            <a-form-item label="每月上限" name="monthlyPointsLimit">
              <a-input-number v-model:value="formData.monthlyPointsLimit" style="width: 100%" :min="0" />
            </a-form-item>
            <a-form-item label="状态" name="status">
              <a-select v-model:value="formData.status">
                <a-select-option :value="1">启用</a-select-option>
                <a-select-option :value="0">禁用</a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="optional" header="扩展信息（选填）">
            <a-form-item label="图标URL" name="iconUrl">
              <a-input v-model:value="formData.iconUrl" placeholder="图标链接地址" />
            </a-form-item>
            <a-form-item label="徽章颜色" name="badgeColor">
              <a-input v-model:value="formData.badgeColor" placeholder="#hex 或 颜色名" />
            </a-form-item>
            <a-form-item label="权益配置(JSON)" name="benefitsJson">
              <a-textarea v-model:value="formData.benefitsJson" :rows="4" placeholder='JSON格式，如: {"discount": 0.9, "freeShipping": true}' />
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
import { getVipLevelConfigList, addVipLevelConfig, updateVipLevelConfig, deleteVipLevelConfig } from '@/api/vipLevelConfig'
import type { FormInstance } from 'ant-design-vue'
import type { PageResult, VipLevelConfigRecord } from '@/types/api'
import humps from 'humps'

const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref('新增')
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
  { title: '等级ID', dataIndex: 'levelId', key: 'levelId', width: 80 },
  { title: 'VIP等级', dataIndex: 'vipLevel', key: 'vipLevel', width: 90 },
  { title: '等级名称', dataIndex: 'levelName', key: 'levelName' },
  { title: '最小成长值', dataIndex: 'minPoints', key: 'minPoints', width: 120 },
  { title: '最大成长值', dataIndex: 'maxPoints', key: 'maxPoints', width: 120 },
  { title: '每日上限', dataIndex: 'dailyPointsLimit', key: 'dailyPointsLimit', width: 90 },
  { title: '每月上限', dataIndex: 'monthlyPointsLimit', key: 'monthlyPointsLimit', width: 90 },
  { title: '状态', key: 'status', width: 80 },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 180 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' }
]

const dataSource = ref<VipLevelConfigRecord[]>([])
const pagination = reactive<PaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条`,
  showSizeChanger: true,
  showQuickJumper: true
})

const formData = reactive<VipLevelConfigRecord>({
  levelId: undefined,
  vipLevel: 0,
  levelName: '',
  minPoints: 0,
  maxPoints: undefined,
  iconUrl: undefined,
  badgeColor: undefined,
  dailyPointsLimit: 100,
  monthlyPointsLimit: 1000,
  benefitsJson: undefined,
  status: 1
})

const rules = {
  vipLevel: [{ required: true, message: '请输入VIP等级', trigger: 'blur' }],
  levelName: [{ required: true, message: '请输入等级名称', trigger: 'blur' }],
  minPoints: [{ required: true, message: '请输入最小成长值', trigger: 'blur' }],
  dailyPointsLimit: [{ required: true, message: '请输入每日上限', trigger: 'blur' }],
  monthlyPointsLimit: [{ required: true, message: '请输入每月上限', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getVipLevelConfigList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    let { data } = response
    if (data?.code === 200 && data?.data) {
      data = humps.camelizeKeys(data) as PageResult<VipLevelConfigRecord>
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
  modalTitle.value = '新增'
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {
    levelId: undefined,
    vipLevel: 0,
    levelName: '',
    minPoints: 0,
    maxPoints: undefined,
    iconUrl: undefined,
    badgeColor: undefined,
    dailyPointsLimit: 100,
    monthlyPointsLimit: 1000,
    benefitsJson: undefined,
    status: 1
  })
  modalVisible.value = true
}

const handleEdit = (record: VipLevelConfigRecord): void => {
  modalTitle.value = '编辑'
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, { ...record })
  modalVisible.value = true
}

const handleDelete = (record: VipLevelConfigRecord): void => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除等级 "${record.levelName}" 吗？`,
    onOk: async () => {
      try {
        if (record.levelId) {
          await deleteVipLevelConfig(record.levelId)
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
    if (formData.levelId) {
      await updateVipLevelConfig(formData.levelId, formData)
      message.success('更新成功')
    } else {
      await addVipLevelConfig(formData)
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
