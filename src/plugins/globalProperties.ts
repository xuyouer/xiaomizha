import type {App} from 'vue'
import * as Utils from '@/utils'
import * as Constants from '@/constants'
import dayjs from '@/plugins/dayjs'

export function registerGlobalProperties(app: App) {
    app.config.globalProperties.$utils = Utils
    app.config.globalProperties.$constants = Constants
    app.config.globalProperties.$dayjs = dayjs
}
