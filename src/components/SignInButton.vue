<script setup lang="ts">
import {ref, computed} from 'vue'
import {CheckCircleOutlined} from '@ant-design/icons-vue'
import {useI18n} from 'vue-i18n'
import {message} from 'ant-design-vue'
import {signIn as signInApi} from '@/api'
import {useUserStore} from '@/stores/user'

const props = defineProps({
  signed: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as () => 'small' | 'middle' | 'large',
    default: 'middle'
  },
  block: {
    type: Boolean,
    default: false
  },
  unsignedClass: {
    type: [String, Array, Object],
    default: ''
  },
  signedClass: {
    type: [String, Array, Object],
    default: ''
  },
  unsignedStyle: {
    type: Object,
    default: () => ({})
  },
  signedStyle: {
    type: Object,
    default: () => ({})
  },
  userId: {
    type: Number,
    default: undefined
  }
})

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'error'): void
}>()

const {t} = useI18n()
const userStore = useUserStore()

const loading = ref(false)

const isViewingOtherUser = computed(() => {
  if (props.userId === undefined) return false
  return props.userId !== userStore.currentUserId
})

const handleSignIn = async () => {
  if (props.signed || loading.value) return

  const userId = props.userId ?? userStore.currentUserId
  if (!userId) {
    message.error(t('auth.pleaseLogin'))
    return
  }

  loading.value = true
  try {
    const response = await signInApi(userId)
    const {data} = response
    if (data.code === 200) {
      message.success(data.data.message || t('signIn.signed'))
      emit('success')
    } else {
      message.error(data.message || t('signIn.signInFailed'))
      emit('error')
    }
  } catch (error) {
    console.error('签到失败:', error)
    message.error(t('signIn.signInFailed'))
    emit('error')
  } finally {
    loading.value = false
  }
}

// const buttonClass = computed(() => ({
//   'sign-in-button': true,
//   'sign-in-button-signed': props.signed,
//   'sign-in-button-loading': loading.value
// }))
const buttonClass = computed(() => [
  'sign-in-button',
  props.signed ? 'sign-in-button-signed' : '',
  loading.value ? 'sign-in-button-loading' : '',
  props.block ? 'sign-in-button-block' : '',
  props.signed ? props.signedClass : props.unsignedClass
])

const buttonStyle = computed(() => props.signed ? props.signedStyle : props.unsignedStyle)
</script>

<template>
  <a-button
      :type="signed ? 'default' : 'primary'"
      :size="size"
      :disabled="signed"
      :loading="loading"
      :class="buttonClass"
      :style="buttonStyle"
      @click="handleSignIn"
  >
    <template v-if="isViewingOtherUser && signed">
      <CheckCircleOutlined/>
      {{ t('signIn.signed') }}
    </template>
    <template v-else-if="isViewingOtherUser">
      {{ t('signIn.viewOnly') }}
    </template>
    <template v-else-if="signed">
      <CheckCircleOutlined/>
      {{ t('signIn.signed') }}
    </template>
    <template v-else>
      {{ t('signIn.signInNow') }}
    </template>
  </a-button>
</template>

<style scoped lang="scss">

</style>