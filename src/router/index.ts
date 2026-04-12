import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from '@/stores/user'
import {message} from 'ant-design-vue'
import i18n from '@/locales'
import routes from './modules'
import {localStorageCache, sessionStorageCache} from "@/utils"
import {CACHE_KEYS} from "@/constants"

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, _from, next) => {
    // document.title = (to.meta.title as string) ?? '小咪楂后台管理系统'
    document.title = (to.meta.title as string) ?? i18n.global.t('app.title')

    const userStore = useUserStore()
    const token = localStorageCache.get(CACHE_KEYS.token) || sessionStorageCache.get(CACHE_KEYS.token)
    const t = i18n.global.t

    if (to.meta.requiresAuth !== false) {
        if (!token) {
            // message.warning('请先登录')
            message.warning(t('auth.pleaseLogin'))
            // next({ path: '/login', replace: true })
            next({path: '/login', query: {redirect: to.fullPath}, replace: true})
            return
        }
        if (!userStore.userInfo) {
            try {
                userStore.initUserInfo()
            } catch (error) {
                // message.error('获取用户信息失败，请重新登录')
                message.error(t('auth.loginFailed'))
                localStorageCache.remove(CACHE_KEYS.token)
                sessionStorageCache.remove(CACHE_KEYS.token)
                // next({ path: '/login', replace: true })
                next({path: '/login', query: {redirect: to.fullPath}, replace: true})
                return
            }
        }
        next()
        return
    }

    if ((to.path === '/login' || to.path === '/register') && token) {
        // next({ path: '/', replace: true })
        const redirectPath = (to.query.redirect as string) || '/'
        next({path: redirectPath, replace: true})
        return
    }
    next()
})

export default router
