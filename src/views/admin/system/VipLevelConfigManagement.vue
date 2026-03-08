<template>
  <div class="vip-level-config-management">
    <a-card>
      <template #title>
        <span>{{ t('vipLevel.management.title') }}</span>
      </template>
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined/>
          </template>
          {{ t('vipLevel.management.add') }}
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
              {{ record.status === 1 ? t('vipLevel.common.enabled') : t('vipLevel.common.disabled') }}
            </a-tag>
          </template>
          <template v-if="column.key === 'createdAt'">
            <a-tag>{{ record.createdAt }}</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">{{
                  t('vipLevel.management.edit')
                }}
              </a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record)">{{
                  t('vipLevel.management.delete')
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
          <a-collapse-panel key="required" :header="t('vipLevel.management.form.basicInfo')" :force-render="true">
            <a-form-item :label="t('vipLevel.management.form.vipLevel')" name="vipLevel">
              <a-input-number v-model:value="formData.vipLevel" style="width: 100%" :min="0"/>
            </a-form-item>
            <a-form-item :label="t('vipLevel.management.form.levelName')" name="levelName">
              <a-input v-model:value="formData.levelName"/>
            </a-form-item>
            <a-form-item :label="t('vipLevel.management.form.minPoints')" name="minPoints">
              <a-input-number v-model:value="formData.minPoints" style="width: 100%" :min="0"/>
            </a-form-item>
            <a-form-item :label="t('vipLevel.management.form.maxPoints')" name="maxPoints">
              <a-input-number v-model:value="formData.maxPoints" style="width: 100%" :min="0"
                              :placeholder="t('vipLevel.management.form.maxPointsPlaceholder')"/>
            </a-form-item>
            <a-form-item :label="t('vipLevel.management.form.dailyPointsLimit')" name="dailyPointsLimit">
              <a-input-number v-model:value="formData.dailyPointsLimit" style="width: 100%" :min="0"/>
            </a-form-item>
            <a-form-item :label="t('vipLevel.management.form.monthlyPointsLimit')" name="monthlyPointsLimit">
              <a-input-number v-model:value="formData.monthlyPointsLimit" style="width: 100%" :min="0"/>
            </a-form-item>
            <a-form-item :label="t('vipLevel.management.form.status')" name="status">
              <a-select v-model:value="formData.status">
                <a-select-option :value="1">{{ t('vipLevel.common.enabled') }}</a-select-option>
                <a-select-option :value="0">{{ t('vipLevel.common.disabled') }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="optional" :header="t('vipLevel.management.form.extraInfo')">
            <a-form-item :label="t('vipLevel.management.form.iconUrl')" name="iconUrl">
              <a-input v-model:value="formData.iconUrl"
                       :placeholder="t('vipLevel.management.form.iconUrlPlaceholder')"/>
            </a-form-item>
            <a-form-item :label="t('vipLevel.management.form.badgeColor')" name="badgeColor">
              <a-input v-model:value="formData.badgeColor"
                       :placeholder="t('vipLevel.management.form.badgeColorPlaceholder')"/>
            </a-form-item>
            <a-form-item :label="t('vipLevel.management.form.benefitsJson')" name="benefitsJson">
              <a-textarea v-model:value="formData.benefitsJson" :rows="4"
                          :placeholder="t('vipLevel.management.form.benefitsJsonPlaceholder')"/>
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
import type {TablePaginationConfig} from 'ant-design-vue/es/table'
import {
  getVipLevelConfigList,
  addVipLevelConfig,
  updateVipLevelConfig,
  deleteVipLevelConfig
} from '@/api'
import type {FormInstance} from 'ant-design-vue'
import type {PageResult, VipLevelConfigRecord} from '@/types/api'
import humps from 'humps'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const loading = ref(false)
const modalVisible = ref(false)
const modalTitle = ref(t('vipLevel.management.add'))
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

const columns = computed<ColumnType[]>(() => [
  {title: t('vipLevel.management.columns.levelId'), dataIndex: 'levelId', key: 'levelId', width: 80},
  {title: t('vipLevel.management.columns.vipLevel'), dataIndex: 'vipLevel', key: 'vipLevel', width: 90},
  {title: t('vipLevel.management.columns.levelName'), dataIndex: 'levelName', key: 'levelName'},
  {title: t('vipLevel.management.columns.minPoints'), dataIndex: 'minPoints', key: 'minPoints', width: 120},
  {title: t('vipLevel.management.columns.maxPoints'), dataIndex: 'maxPoints', key: 'maxPoints', width: 120},
  {
    title: t('vipLevel.management.columns.dailyPointsLimit'),
    dataIndex: 'dailyPointsLimit',
    key: 'dailyPointsLimit',
    width: 90
  },
  {
    title: t('vipLevel.management.columns.monthlyPointsLimit'),
    dataIndex: 'monthlyPointsLimit',
    key: 'monthlyPointsLimit',
    width: 90
  },
  {title: t('vipLevel.management.columns.status'), key: 'status', width: 80},
  {title: t('vipLevel.management.columns.createdAt'), dataIndex: 'createdAt', key: 'createdAt', width: 180},
  {title: t('vipLevel.management.columns.action'), key: 'action', width: 150, fixed: 'right'}
])

const dataSource = ref<VipLevelConfigRecord[]>([])
const pagination = reactive<PaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => t('vipLevel.management.pagination.total', {total}),
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
  vipLevel: [{required: true, message: t('vipLevel.management.form.validate.vipLevel'), trigger: 'blur'}],
  levelName: [{required: true, message: t('vipLevel.management.form.validate.levelName'), trigger: 'blur'}],
  minPoints: [{required: true, message: t('vipLevel.management.form.validate.minPoints'), trigger: 'blur'}],
  dailyPointsLimit: [{
    required: true,
    message: t('vipLevel.management.form.validate.dailyPointsLimit'),
    trigger: 'blur'
  }],
  monthlyPointsLimit: [{
    required: true,
    message: t('vipLevel.management.form.validate.monthlyPointsLimit'),
    trigger: 'blur'
  }],
  status: [{required: true, message: t('vipLevel.management.form.validate.status'), trigger: 'change'}]
}

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getVipLevelConfigList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    let {data} = response
    if (data?.code === 200 && data?.data) {
      data = humps.camelizeKeys(data) as PageResult<VipLevelConfigRecord>
      dataSource.value = data.data || []
      pagination.total = data.total || 0
      pagination.current = data.current || 1
      pagination.pageSize = data.pageSize || 10
    }
  } catch {
    message.error(t('vipLevel.management.messages.loadFailed'))
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
  modalTitle.value = t('vipLevel.management.add')
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
  modalTitle.value = t('vipLevel.management.edit')
  modalCollapseActiveKey.value = ['required']
  Object.assign(formData, {...record})
  modalVisible.value = true
}

const handleDelete = (record: VipLevelConfigRecord): void => {
  Modal.confirm({
    title: t('vipLevel.management.confirm.delete.title'),
    content: t('vipLevel.management.confirm.delete.content', {levelName: record.levelName}),
    onOk: async () => {
      try {
        if (record.levelId) {
          await deleteVipLevelConfig(record.levelId)
          message.success(t('vipLevel.management.messages.deleteSuccess'))
          await loadData()
        }
      } catch {
        message.error(t('vipLevel.management.messages.deleteFailed'))
      }
    }
  })
}

const handleSubmit = async (): Promise<void> => {
  try {
    await formRef.value?.validate()
    if (formData.levelId) {
      await updateVipLevelConfig(formData.levelId, formData)
      message.success(t('vipLevel.management.messages.updateSuccess'))
    } else {
      await addVipLevelConfig(formData)
      message.success(t('vipLevel.management.messages.createSuccess'))
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
