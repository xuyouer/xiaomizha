import type {App, Component} from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import SignInButton from "@/components/SignInButton.vue"
import FormModal from "@/components/FormModal.vue"
import UserDropdown from "@/components/UserDropdown.vue"
import FormDrawer from "@/components/FormDrawer.vue"

const GLOBAL_COMPONENTS: Record<string, Component> = {
    Header,
    Footer,
    LocaleSwitcher,
    ThemeSwitcher,
    SignInButton,
    FormModal,
    UserDropdown,
    FormDrawer,
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
