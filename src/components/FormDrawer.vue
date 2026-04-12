<script setup lang="ts">
import {ref, computed, useSlots, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import type {FormInstance} from 'ant-design-vue'

const {t} = useI18n()

interface PanelItem {
  key: string
  header: string
}

const props = withDefaults(defineProps<{
  open: boolean
  title: string
  modelValue: Record<string, unknown>
  rules?: Record<string, unknown[]>
  width?: number | string
  confirmLoading?: boolean
  footer?: boolean
  panels?: PanelItem[]
  requiredHeader?: string
  optionalHeader?: string
  accordion?: boolean
  activeKey?: string | string[] | number | number[]
}>(), {
  width: 520,
  confirmLoading: false,
  footer: undefined,
  rules: () => ({}),
  panels: () => [],
  requiredHeader: '',
  optionalHeader: '',
  accordion: false,
  activeKey: undefined
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'ok'): void
  (e: 'cancel'): void
  (e: 'update:activeKey', value: string | string[] | number | number[]): void
}>()

const slots = useSlots()
const formRef = ref<FormInstance>()
const internalActiveKey = ref<string | string[] | number | number[]>([])

const hasExtraSlot = computed(() => !!slots.extra)
const hasPanels = computed(() => props.panels && props.panels.length > 0)
const hasRequiredSlot = computed(() => !!slots.required)
const hasOptionalSlot = computed(() => !!slots.optional)
const useLegacyMode = computed(() => !hasPanels.value && (hasRequiredSlot.value || hasOptionalSlot.value))

const collapseActiveKey = computed({
  get: () => {
    if (props.activeKey !== undefined) {
      return props.activeKey
    }
    return internalActiveKey.value
  },
  set: (value: string | string[] | number | number[]) => {
    internalActiveKey.value = value
    emit('update:activeKey', value)
  }
})

watch(() => props.activeKey, (newVal) => {
  if (newVal !== undefined) {
    internalActiveKey.value = newVal
  }
}, {immediate: true})

const drawerWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})

const handleOk = () => {
  emit('ok')
}

const handleCancel = () => {
  emit('cancel')
  emit('update:open', false)
}

const validate = async () => {
  return formRef.value?.validate()
}

const resetFields = () => {
  formRef.value?.resetFields()
}

const clearValidate = (name?: string | string[]) => {
  formRef.value?.clearValidate(name)
}

defineExpose({
  formRef,
  validate,
  resetFields,
  clearValidate,
  collapseActiveKey
})
</script>

<template>
  <a-drawer
      :open="open"
      :title="title"
      :width="drawerWidth"
      placement="right"
      :closable="true"
      @close="handleCancel"
  >
    <a-form
        ref="formRef"
        :model="modelValue"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
    >
      <slot v-if="hasExtraSlot" name="extra"></slot>

      <template v-if="useLegacyMode">
        <a-collapse v-model:activeKey="collapseActiveKey" :accordion="accordion">
          <a-collapse-panel v-if="hasRequiredSlot" key="required" :header="requiredHeader" :force-render="true">
            <slot name="required"></slot>
          </a-collapse-panel>
          <a-collapse-panel v-if="hasOptionalSlot" key="optional" :header="optionalHeader">
            <slot name="optional"></slot>
          </a-collapse-panel>
        </a-collapse>
      </template>

      <template v-else-if="hasPanels">
        <a-collapse v-model:activeKey="collapseActiveKey" :accordion="accordion">
          <a-collapse-panel
              v-for="panel in panels"
              :key="panel.key"
              :header="panel.header"
              :force-render="true"
          >
            <slot :name="panel.key"></slot>
          </a-collapse-panel>
        </a-collapse>
      </template>
    </a-form>

    <template #footer>
      <div style="text-align: right">
        <a-button style="margin-right: 8px" @click="handleCancel">{{ t('common.cancel') }}</a-button>
        <a-button type="primary" :loading="confirmLoading" @click="handleOk">{{ t('common.confirm') }}</a-button>
      </div>
    </template>
  </a-drawer>
</template>

<style scoped lang="scss">

</style>
