import type {App, Component} from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

/**
 * 全局注册的组件映射
 * <p/>
 * 组件名 -> 组件
 */
const GLOBAL_COMPONENTS: Record<string, Component> = {
    Header,
    Footer,
    LocaleSwitcher,
    ThemeSwitcher,
}

/**
 * 注册全局组件
 *
 * @param app Vue 应用实例
 */
export function registerGlobalComponents(app: App): void {
    Object.entries(GLOBAL_COMPONENTS).forEach(([name, component]) => {
        app.component(name, component)
    })
}
