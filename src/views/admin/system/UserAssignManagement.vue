<script setup lang="ts">
import {ref, reactive, onMounted, computed} from 'vue'
import {useRoute} from 'vue-router'
import {message} from 'ant-design-vue'
import {CrownOutlined} from '@ant-design/icons-vue'
import type {ColumnType} from 'ant-design-vue/es/table'
import type {TablePaginationConfig} from 'ant-design-vue/es/table'
import {
  getUserList,
  getUserDetail,
  getRoleList,
  getResourceList,
  getVipLevelConfigList,
  updateUserRolesByUserId,
  updateUserResourcesByUserId,
  updateVipInfoByUserId,
  addPointsByUserId,
  deductPointsByUserId,
  setPointsByUserId,
  getLicenseList,
  getLicensesByUserId,
  batchCreateUserLicenseRelations,
  batchDeleteUserLicenseRelations
} from '@/api'
import type {
  PageResult,
  User,
  UserDetailDTO,
  Role,
  Resource,
  VipLevelConfigRecord,
  LicenseInfo
} from "@/types"
import humps from "humps"
import {useI18n} from 'vue-i18n'
import FormDrawer from '@/components/FormDrawer.vue'
import type {Dayjs} from 'dayjs'
import {getLicenseTypeMeta, usePaginationConfig} from "@/utils"

const {t} = useI18n()
const route = useRoute()

interface ResourceTreeNode {
  label: string
  value: number
  children?: ResourceTreeNode[]
}

interface RoleOption {
  label: string
  value: number
}

interface VipOption {
  label: string
  value: number
}

interface LicenseOption {
  label: string
  value: string
}

interface UserDetailInfo {
  roles: string
  vipLevel: number
  points: number
  accountStatus: number
}

const loading = ref(false)
const drawerVisible = ref(false)
const drawerRef = ref<InstanceType<typeof FormDrawer>>()
const searchKeyword = ref('')
const detailLoading = ref(false)
const submitLoading = ref(false)

const roleLoading = ref(false)
const resourceLoading = ref(false)
const vipLoading = ref(false)
const licenseLoading = ref(false)

const roleOptions = ref<RoleOption[]>([])
const resourceTreeData = ref<ResourceTreeNode[]>([])
const vipOptions = ref<VipOption[]>([])
const licenseOptions = ref<LicenseOption[]>([])

const currentUserDetail = ref<UserDetailInfo>({
  roles: '',
  vipLevel: 0,
  points: 0,
  accountStatus: 1
})

const currentUserId = ref<number>()
const currentUsername = ref<string>('')

const columns = computed<ColumnType[]>(() => [
  {
    title: t('userAssign.columns.userId'),
    dataIndex: 'userId',
    key: 'userId',
    width: 100
  },
  {
    title: t('userAssign.columns.username'),
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: t('userAssign.columns.accountStatus'),
    key: 'accountStatus',
    width: 100,
    align: 'center'
  },
  {
    title: t('userAssign.columns.action'),
    key: 'action',
    width: 150,
    align: 'center',
    fixed: 'right'
  }
])

const dataSource = ref<User[]>([])
const pagination = reactive(usePaginationConfig('userAssign.pagination.total').value)

const formData = reactive({
  roleIds: [] as number[],
  resourceIds: [] as number[],
  vipLevel: undefined as number | undefined,
  vipExpireTime: undefined as Dayjs | undefined,
  pointsType: 'add' as 'add' | 'subtract' | 'set',
  pointsAmount: undefined as number | undefined,
  pointsReason: '',
  licenseKeys: [] as string[]
})

const originalFormData = reactive({
  roleIds: [] as number[],
  resourceIds: [] as number[],
  vipLevel: undefined as number | undefined,
  licenseKeys: [] as string[]
})

const panels = computed(() => [
  {key: 'roles', header: t('userAssign.assignRoles')},
  {key: 'resources', header: t('userAssign.assignResources')},
  {key: 'vip', header: t('userAssign.assignVip')},
  {key: 'points', header: t('userAssign.assignPoints')},
  {key: 'license', header: t('userAssign.assignLicense')}
])

const rules = computed(() => ({
  // roleIds: [{required: true, message: t('userAssign.form.validate.roleIds'), trigger: 'change'}],
  // resourceIds: [{required: true, message: t('userAssign.form.validate.resourceIds'), trigger: 'change'}],
  // vipLevel: [{required: true, message: t('userAssign.form.validate.vipLevel'), trigger: 'change'}],
  // pointsAmount: [{required: true, message: t('userAssign.form.validate.pointsAmount'), trigger: 'blur'}],
  // pointsReason: [{required: true, message: t('userAssign.form.validate.pointsReason'), trigger: 'blur'}],
  // licenseType: [{required: true, message: t('userAssign.form.validate.licenseType'), trigger: 'change'}],
  // licenseDuration: [{required: true, message: t('userAssign.form.validate.licenseDuration'), trigger: 'blur'}]
}))

const loadData = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await getUserList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      keyword: searchKeyword.value || undefined
    })
    let {data} = response
    if (data.code === 200 && data.data) {
      data = humps.camelizeKeys(data) as PageResult<User>
      dataSource.value = data.data || []
      pagination.total = data.total || 0
      pagination.current = data.current || 1
      pagination.pageSize = data.pageSize || 10
    }
  } catch {
    message.error(t('userAssign.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

const loadRoleOptions = async (): Promise<void> => {
  roleLoading.value = true
  try {
    const response = await getRoleList({current: 1, pageSize: 1000})
    let {data} = response
    if (data.code === 200 && data.data) {
      data = humps.camelizeKeys(data) as PageResult<Role>
      roleOptions.value = (data.data || []).map((role) => ({
        label: role.roleName || '',
        value: role.roleId!
      }))
    }
  } catch {
    message.error(t('userAssign.messages.loadRoleFailed'))
  } finally {
    roleLoading.value = false
  }
}

const buildResourceTree = (resources: Resource[]): ResourceTreeNode[] => {
  const map = new Map<number, ResourceTreeNode>()
  const roots: ResourceTreeNode[] = []

  resources.forEach((resource) => {
    map.set(resource.resourceId!, {
      label: resource.resourceName || '',
      value: resource.resourceId!,
      children: []
    })
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

const loadResourceOptions = async (): Promise<void> => {
  resourceLoading.value = true
  try {
    const response = await getResourceList({current: 1, pageSize: 1000})
    let {data} = response
    if (data.code === 200 && data.data) {
      data = humps.camelizeKeys(data) as PageResult<Resource>
      resourceTreeData.value = buildResourceTree(data.data || [])
    }
  } catch {
    message.error(t('userAssign.messages.loadResourceFailed'))
  } finally {
    resourceLoading.value = false
  }
}

const loadVipOptions = async (): Promise<void> => {
  vipLoading.value = true
  try {
    const response = await getVipLevelConfigList({current: 1, pageSize: 100})
    let {data} = response
    if (data.code === 200 && data.data) {
      data = humps.camelizeKeys(data) as PageResult<VipLevelConfigRecord>
      vipOptions.value = (data.data || []).map((vip) => ({
        label: `${vip.levelName} (VIP ${vip.vipLevel})`,
        value: vip.vipLevel!
      }))
    }
  } catch {
    message.error(t('userAssign.messages.loadVipFailed'))
  } finally {
    vipLoading.value = false
  }
}

const loadLicenseOptions = async (): Promise<void> => {
  licenseLoading.value = true
  try {
    const response = await getLicenseList({current: 1, pageSize: 1000})
    let {data} = response
    if (data.code === 200 && data.data) {
      data = humps.camelizeKeys(data) as PageResult<LicenseInfo>
      licenseOptions.value = (data.data || []).map((license) => ({
        label: `${license.licenseId || license.licenseKey} (${t(getLicenseTypeMeta(license.licenseType).i18nKey)})`,
        value: license.licenseKey!
      }))
    }
  } catch {
    message.error(t('userAssign.messages.loadLicenseFailed'))
  } finally {
    licenseLoading.value = false
  }
}

const handleTableChange = (pag: TablePaginationConfig): void => {
  pagination.current = pag.current || 1
  pagination.pageSize = pag.pageSize || 10
  loadData()
}

const handleSearch = (): void => {
  pagination.current = 1
  loadData()
}

const fetchUserDetail = async (userId: number): Promise<UserDetailDTO | null> => {
  try {
    detailLoading.value = true
    const response = await getUserDetail(userId)
    const {data} = response
    if (data.code === 200 && data.data) {
      return humps.camelizeKeys(data.data) as UserDetailDTO
    }
    return null
  } catch {
    message.error(t('userAssign.messages.loadDetailFailed'))
    return null
  } finally {
    detailLoading.value = false
  }
}

const fetchUserLicenses = async (userId: number): Promise<string[]> => {
  try {
    const response = await getLicensesByUserId(userId, {current: 1, pageSize: 1000})
    let {data} = response
    if (data.code === 200 && data.data) {
      data = humps.camelizeKeys(data) as PageResult<LicenseInfo>
      return (data.data || []).map((license) => license.licenseKey!)
    }
    return []
  } catch {
    return []
  }
}

const handleAssign = async (record: User): Promise<void> => {
  currentUserId.value = record.userId
  currentUsername.value = record.username

  const [userDetail, userLicenseKeys] = await Promise.all([
    fetchUserDetail(record.userId!),
    fetchUserLicenses(record.userId!)
  ])
  if (!userDetail) {
    return
  }

  const roles = userDetail.userRoles?.map((r) => r.roleName).join(', ') || '-'
  currentUserDetail.value = {
    roles: roles,
    vipLevel: userDetail.userVipInfo?.vipLevel || 0,
    points: userDetail.userPoints?.availablePoints || 0,
    accountStatus: record.accountStatus || 1
  }

  formData.roleIds = userDetail.userRoles?.map((r) => r.roleId!) || []
  formData.resourceIds = userDetail.userResources?.map((r) => r.resourceId!) || []
  formData.vipLevel = userDetail.userVipInfo?.vipLevel
  formData.vipExpireTime = undefined
  formData.pointsType = 'add'
  formData.pointsAmount = undefined
  formData.pointsReason = ''
  // formData.licenseKeys = userDetail.userLicenses?.map((l) => l.licenseKey!) || []
  formData.licenseKeys = userLicenseKeys

  originalFormData.roleIds = [...formData.roleIds]
  originalFormData.resourceIds = [...formData.resourceIds]
  originalFormData.vipLevel = formData.vipLevel
  originalFormData.licenseKeys = [...formData.licenseKeys]

  await Promise.all([
    loadRoleOptions(),
    loadResourceOptions(),
    loadVipOptions(),
    loadLicenseOptions()
  ])

  if (drawerRef.value) {
    drawerRef.value.collapseActiveKey = ['roles', 'resources', 'vip', 'points', 'license']
  }
  drawerVisible.value = true
}

const handleSubmit = async (): Promise<void> => {
  try {
    await drawerRef.value?.validate()
    submitLoading.value = true

    const updates: string[] = []
    const errors: string[] = []
    const userId = currentUserId.value!

    if (JSON.stringify(formData.roleIds) !== JSON.stringify(originalFormData.roleIds)) {
      try {
        await updateUserRolesByUserId(userId, formData.roleIds)
        updates.push(t('userAssign.assignRoles'))
      } catch {
        errors.push(t('userAssign.assignRoles'))
      }
    }
    if (JSON.stringify(formData.resourceIds) !== JSON.stringify(originalFormData.resourceIds)) {
      try {
        await updateUserResourcesByUserId(userId, formData.resourceIds)
        updates.push(t('userAssign.assignResources'))
      } catch {
        errors.push(t('userAssign.assignResources'))
      }
    }
    if (formData.vipLevel !== undefined && formData.vipLevel !== originalFormData.vipLevel) {
      try {
        const vipData: { vipLevel?: number; vipExpireDate?: string } = {vipLevel: formData.vipLevel}
        if (formData.vipExpireTime) {
          vipData.vipExpireDate = formData.vipExpireTime.format('YYYY-MM-DD HH:mm:ss')
        }
        await updateVipInfoByUserId(userId, vipData)
        updates.push(t('userAssign.assignVip'))
      } catch {
        errors.push(t('userAssign.assignVip'))
      }
    }
    if (formData.pointsAmount !== undefined && formData.pointsAmount > 0 && formData.pointsReason) {
      try {
        if (formData.pointsType === 'add') {
          await addPointsByUserId(userId, formData.pointsAmount)
        } else if (formData.pointsType === 'subtract') {
          await deductPointsByUserId(userId, formData.pointsAmount)
        } else {
          await setPointsByUserId(userId, formData.pointsAmount)
        }
        updates.push(t('userAssign.assignPoints'))
      } catch {
        errors.push(t('userAssign.assignPoints'))
      }
    }
    if (JSON.stringify(formData.licenseKeys) !== JSON.stringify(originalFormData.licenseKeys)) {
      try {
        const addedKeys = formData.licenseKeys.filter(k => !originalFormData.licenseKeys.includes(k))
        const removedKeys = originalFormData.licenseKeys.filter(k => !formData.licenseKeys.includes(k))

        if (addedKeys.length > 0) {
          await batchCreateUserLicenseRelations(userId, addedKeys)
        }
        if (removedKeys.length > 0) {
          await batchDeleteUserLicenseRelations(userId, removedKeys)
        }
        updates.push(t('userAssign.assignLicense'))
      } catch {
        errors.push(t('userAssign.assignLicense'))
      }
    }

    if (updates.length === 0 && errors.length === 0) {
      message.warning(t('userAssign.messages.noChanges'))
      submitLoading.value = false
      return
    }

    if (updates.length > 0) {
      message.success(t('userAssign.messages.assignSuccess') + ': ' + updates.join(', '))
    }
    if (errors.length > 0) {
      message.error(t('userAssign.messages.assignFailed') + ': ' + errors.join(', '))
    }

    drawerVisible.value = false
    await loadData()
  } catch (error) {
    console.error('表单验证失败:', error)
  } finally {
    submitLoading.value = false
  }
}

const handleCancel = (): void => {
  drawerVisible.value = false
  drawerRef.value?.resetFields()
}

const handleOpenDrawerFromQuery = async () => {
  const {userId, openDrawer} = route.query
  if (openDrawer === 'true' && userId) {
    const userIdNum = Number(userId)
    if (!isNaN(userIdNum)) {
      let user = dataSource.value.find(u => u.userId === userIdNum)
      if (!user) {
        searchKeyword.value = String(userId)
        await loadData()
        user = dataSource.value.find(u => u.userId === userIdNum)
      }
      if (user) {
        await handleAssign(user)
      }
    }
  }
}

onMounted(async () => {
  await loadData()
  await handleOpenDrawerFromQuery()
})
</script>

<template>
  <div class="user-assign-management">
    <a-card>
      <template #title>
        <span>{{ t('userAssign.title') }}</span>
      </template>
      <template #extra>
        <a-space>
          <a-input-search
              v-model:value="searchKeyword"
              :placeholder="t('userAssign.searchPlaceholder')"
              style="width: 250px"
              allow-clear
              @search="handleSearch"
          />
        </a-space>
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
          <template v-if="column.key === 'userId'">
            <a-tag>
              {{ record.userId }}
            </a-tag>
          </template>
          <template v-if="column.key === 'username'">
            <a-tag>
              {{ record.username }}
            </a-tag>
          </template>
          <template v-if="column.key === 'accountStatus'">
            <a-tag :color="record.accountStatus === 1 ? 'green' : 'red'">
              {{ record.accountStatus === 1 ? t('userAssign.status.normal') : t('userAssign.status.disabled') }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="link" size="small" @click="handleAssign(record)">
              {{ t('userAssign.assign') }}
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>

    <FormDrawer
        ref="drawerRef"
        v-model:open="drawerVisible"
        :title="t('userAssign.title')"
        :model-value="formData"
        :rules="rules"
        :width="700"
        :panels="panels"
        accordion
        :confirm-loading="submitLoading"
        @ok="handleSubmit"
        @cancel="handleCancel"
    >
      <template #extra>
        <a-descriptions :column="2" size="small" bordered style="padding-bottom: 24px">
          <a-descriptions-item :label="t('userAssign.extraInfo.userId')">
            {{ currentUserId }}
          </a-descriptions-item>
          <a-descriptions-item :label="t('userAssign.extraInfo.username')">
            {{ currentUsername }}
          </a-descriptions-item>
          <a-descriptions-item :label="t('userAssign.extraInfo.roles')">
            {{ currentUserDetail.roles }}
          </a-descriptions-item>
          <a-descriptions-item :label="t('userAssign.extraInfo.vipLevel')">
            <a-tag :color="currentUserDetail.vipLevel > 0 ? 'gold' : 'default'">
              <CrownOutlined/>
              VIP {{ currentUserDetail.vipLevel }}
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item :label="t('userAssign.extraInfo.points')">
            {{ currentUserDetail.points }}
          </a-descriptions-item>
          <a-descriptions-item :label="t('userAssign.extraInfo.accountStatus')">
            <a-tag :color="currentUserDetail.accountStatus === 1 ? 'green' : 'red'">
              {{
                currentUserDetail.accountStatus === 1 ? t('userAssign.status.normal') : t('userAssign.status.disabled')
              }}
            </a-tag>
          </a-descriptions-item>
        </a-descriptions>
      </template>
      <template #roles>
        <a-form-item :label="t('userAssign.form.selectRoles')" name="roleIds">
          <a-select
              v-model:value="formData.roleIds"
              mode="multiple"
              :placeholder="t('userAssign.form.selectRolesPlaceholder')"
              :options="roleOptions"
              :loading="roleLoading"
              allow-clear
          />
        </a-form-item>
      </template>
      <template #resources>
        <a-form-item :label="t('userAssign.form.selectResources')" name="resourceIds">
          <a-tree-select
              v-model:value="formData.resourceIds"
              :tree-data="resourceTreeData"
              tree-checkable
              :placeholder="t('userAssign.form.selectResourcesPlaceholder')"
              :loading="resourceLoading"
              tree-node-filter-prop="label"
              allow-clear
          />
        </a-form-item>
      </template>
      <template #vip>
        <a-form-item :label="t('userAssign.form.vipLevel')" name="vipLevel">
          <a-select
              v-model:value="formData.vipLevel"
              :placeholder="t('userAssign.form.selectVipPlaceholder')"
              :options="vipOptions"
              :loading="vipLoading"
              allow-clear
          />
        </a-form-item>
        <a-form-item :label="t('userAssign.form.vipExpireTime')" name="vipExpireTime">
          <a-date-picker
              v-model:value="formData.vipExpireTime"
              show-time
              :placeholder="t('userAssign.form.vipExpireTimePlaceholder')"
              style="width: 100%"
          />
        </a-form-item>
      </template>
      <template #points>
        <a-form-item :label="t('userAssign.form.pointsType')" name="pointsType">
          <a-radio-group v-model:value="formData.pointsType">
            <a-radio value="add">{{ t('userAssign.form.pointsAdd') }}</a-radio>
            <a-radio value="subtract">{{ t('userAssign.form.pointsSubtract') }}</a-radio>
            <a-radio value="set">{{ t('userAssign.form.pointsSet') }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :label="t('userAssign.form.pointsAmount')" name="pointsAmount">
          <a-input-number
              v-model:value="formData.pointsAmount"
              :min="0"
              :placeholder="t('userAssign.form.pointsAmountPlaceholder')"
              style="width: 100%"
          />
        </a-form-item>
        <a-form-item :label="t('userAssign.form.pointsReason')" name="pointsReason">
          <a-textarea
              v-model:value="formData.pointsReason"
              :placeholder="t('userAssign.form.pointsReasonPlaceholder')"
              :rows="3"
          />
        </a-form-item>
      </template>
      <template #license>
        <a-form-item :label="t('userAssign.form.selectLicense')" name="licenseKeys">
          <a-select
              v-model:value="formData.licenseKeys"
              mode="multiple"
              :placeholder="t('userAssign.form.selectLicensePlaceholder')"
              :options="licenseOptions"
              :loading="licenseLoading"
              allow-clear
          />
        </a-form-item>
      </template>
    </FormDrawer>
  </div>
</template>

<style scoped lang="scss">

</style>
