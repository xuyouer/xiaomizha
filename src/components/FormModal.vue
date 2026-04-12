<script setup lang="ts">
import {ref, computed, useSlots} from 'vue'
import type {FormInstance} from 'ant-design-vue'

const props = withDefaults(defineProps<{
  open: boolean
  title: string
  modelValue: Record<string, unknown>
  rules?: Record<string, unknown[]>
  width?: number | string
  confirmLoading?: boolean
  footer?: boolean
  requiredHeader?: string
  optionalHeader?: string
}>(), {
  width: 520,
  confirmLoading: false,
  footer: undefined,
  rules: () => ({}),
  requiredHeader: '',
  optionalHeader: ''
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'ok'): void
  (e: 'cancel'): void
}>()

const slots = useSlots()
const formRef = ref<FormInstance>()
const collapseActiveKey = ref<string[]>(['required'])

const hasRequiredSlot = computed(() => !!slots.required)
const hasOptionalSlot = computed(() => !!slots.optional)

const modalWidth = computed(() => {
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
  <a-modal
      :open="open"
      :title="title"
      :width="modalWidth"
      :confirm-loading="confirmLoading"
      :footer="footer"
      @ok="handleOk"
      @cancel="handleCancel"
  >
    <a-form
        ref="formRef"
        :model="modelValue"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
    >
      <a-collapse v-model:activeKey="collapseActiveKey">
        <a-collapse-panel v-if="hasRequiredSlot" key="required" :header="requiredHeader" :force-render="true">
          <slot name="required"></slot>
        </a-collapse-panel>
        <a-collapse-panel v-if="hasOptionalSlot" key="optional" :header="optionalHeader">
          <slot name="optional"></slot>
        </a-collapse-panel>
      </a-collapse>
    </a-form>
  </a-modal>
</template>

<style scoped lang="scss">

</style>