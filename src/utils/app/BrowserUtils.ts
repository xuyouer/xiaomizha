/**
 * 浏览器工具类
 */
export const BrowserUtils = {
    /**
     * 判断是否为移动设备
     * @returns 是否为移动设备
     */
    isMobile(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    },

    /**
     * 判断是否为PC设备
     * @returns 是否为PC设备
     */
    isPC(): boolean {
        return !this.isMobile()
    },

    /**
     * 获取浏览器类型
     * @returns 浏览器类型
     */
    getBrowserType(): 'mobile' | 'pc' {
        return this.isMobile() ? 'mobile' : 'pc'
    },

    /**
     * 获取浏览器名称
     * @returns 浏览器名称
     */
    getBrowserName(): string {
        const ua = navigator.userAgent
        if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome'
        if (ua.includes('Firefox')) return 'Firefox'
        if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari'
        if (ua.includes('Edg')) return 'Edge'
        if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera'
        if (ua.includes('Trident') || ua.includes('MSIE')) return 'Internet Explorer'
        return 'Unknown'
    },

    /**
     * 获取浏览器版本
     * @returns 浏览器版本
     */
    getBrowserVersion(): string {
        const ua = navigator.userAgent
        let match: RegExpMatchArray | null = null

        if (ua.includes('Chrome') && !ua.includes('Edg')) {
            match = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/)
        } else if (ua.includes('Firefox')) {
            match = ua.match(/Firefox\/(\d+\.\d+)/)
        } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
            match = ua.match(/Version\/(\d+\.\d+)/)
        } else if (ua.includes('Edg')) {
            match = ua.match(/Edg\/(\d+\.\d+\.\d+\.\d+)/)
        } else if (ua.includes('Opera') || ua.includes('OPR')) {
            match = ua.match(/(?:Opera|OPR)\/(\d+\.\d+)/)
        } else if (ua.includes('Trident') || ua.includes('MSIE')) {
            match = ua.match(/(?:MSIE |rv:)(\d+\.\d+)/)
        }

        return match?.[1] ?? 'Unknown'
    },

    /**
     * 获取操作系统
     * @returns 操作系统
     */
    getOS(): string {
        const ua = navigator.userAgent
        if (ua.includes('Windows')) return 'Windows'
        if (ua.includes('Mac OS')) return 'macOS'
        if (ua.includes('Linux')) return 'Linux'
        if (ua.includes('Android')) return 'Android'
        if (ua.includes('iOS') || /iPhone|iPad|iPod/.test(ua)) return 'iOS'
        return 'Unknown'
    },

    /**
     * 获取屏幕信息
     * @returns 屏幕信息
     */
    getScreenInfo() {
        return {
            width: window.screen.width,
            height: window.screen.height,
            availWidth: window.screen.availWidth,
            availHeight: window.screen.availHeight,
            colorDepth: window.screen.colorDepth,
            pixelDepth: window.screen.pixelDepth,
            devicePixelRatio: window.devicePixelRatio || 1
        }
    },

    /**
     * 获取视口信息
     * @returns 视口信息
     */
    getViewportInfo() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            scrollX: window.scrollX || window.pageXOffset,
            scrollY: window.scrollY || window.pageYOffset
        }
    },

    /**
     * 获取浏览器语言
     * @returns 浏览器语言
     */
    getLanguage(): string {
        return navigator.language || (navigator as any).userLanguage || 'en-US'
    },

    /**
     * 获取所有支持的语言
     * @returns 语言列表
     */
    getLanguages(): string[] {
        return [...(navigator.languages || [])]
    },

    /**
     * 判断是否在线
     * @returns 是否在线
     */
    isOnline(): boolean {
        return navigator.onLine
    },

    /**
     * 判断是否支持本地存储
     * @returns 是否支持本地存储
     */
    isLocalStorageSupported(): boolean {
        try {
            const test = '__test__'
            localStorage.setItem(test, test)
            localStorage.removeItem(test)
            return true
        } catch {
            return false
        }
    },

    /**
     * 判断是否支持会话存储
     * @returns 是否支持会话存储
     */
    isSessionStorageSupported(): boolean {
        try {
            const test = '__test__'
            sessionStorage.setItem(test, test)
            sessionStorage.removeItem(test)
            return true
        } catch {
            return false
        }
    },

    /**
     * 判断是否支持Cookie
     * @returns 是否支持Cookie
     */
    isCookieEnabled(): boolean {
        return navigator.cookieEnabled
    },

    /**
     * 判断是否支持Web Worker
     * @returns 是否支持Web Worker
     */
    isWebWorkerSupported(): boolean {
        return typeof Worker !== 'undefined'
    },

    /**
     * 判断是否支持Service Worker
     * @returns 是否支持Service Worker
     */
    isServiceWorkerSupported(): boolean {
        return 'serviceWorker' in navigator
    },

    /**
     * 判断是否支持Web Speech API
     * @returns 是否支持Web Speech API
     */
    isWebSpeechSupported(): boolean {
        return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    },

    /**
     * 判断是否支持WebRTC
     * @returns 是否支持WebRTC
     */
    isWebRTCSupported(): boolean {
        return !!(window.RTCPeerConnection || (window as any).webkitRTCPeerConnection || (window as any).mozRTCPeerConnection)
    },

    /**
     * 判断是否支持WebSocket
     * @returns 是否支持WebSocket
     */
    isWebSocketSupported(): boolean {
        return typeof WebSocket !== 'undefined'
    },

    /**
     * 判断是否支持Geolocation
     * @returns 是否支持Geolocation
     */
    isGeolocationSupported(): boolean {
        return 'geolocation' in navigator
    },

    /**
     * 判断是否支持Notification
     * @returns 是否支持Notification
     */
    isNotificationSupported(): boolean {
        return 'Notification' in window
    },

    /**
     * 判断是否支持全屏
     * @returns 是否支持全屏
     */
    isFullscreenSupported(): boolean {
        return !!(document.documentElement.requestFullscreen ||
            (document.documentElement as any).webkitRequestFullscreen ||
            (document.documentElement as any).mozRequestFullScreen ||
            (document.documentElement as any).msRequestFullscreen)
    },

    /**
     * 进入全屏
     * @param element 要全屏的元素，默认为document.documentElement
     */
    requestFullscreen(element?: HTMLElement): Promise<void> {
        const el = element || document.documentElement
        if (el.requestFullscreen) {
            return el.requestFullscreen()
        } else if ((el as any).webkitRequestFullscreen) {
            return (el as any).webkitRequestFullscreen()
        } else if ((el as any).mozRequestFullScreen) {
            return (el as any).mozRequestFullScreen()
        } else if ((el as any).msRequestFullscreen) {
            return (el as any).msRequestFullscreen()
        }
        return Promise.reject(new Error('Fullscreen not supported'))
    },

    /**
     * 退出全屏
     */
    exitFullscreen(): Promise<void> {
        if (document.exitFullscreen) {
            return document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
            return (document as any).webkitExitFullscreen()
        } else if ((document as any).mozCancelFullScreen) {
            return (document as any).mozCancelFullScreen()
        } else if ((document as any).msExitFullscreen) {
            return (document as any).msExitFullscreen()
        }
        return Promise.reject(new Error('Fullscreen not supported'))
    },

    /**
     * 判断是否为全屏状态
     * @returns 是否为全屏状态
     */
    isFullscreen(): boolean {
        return !!(
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            (document as any).mozFullScreenElement ||
            (document as any).msFullscreenElement
        )
    },

    /**
     * 复制文本到剪贴板
     * @param text 要复制的文本
     * @returns 是否成功
     */
    async copyToClipboard(text: string): Promise<boolean> {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text)
                return true
            } else {
                const textArea = document.createElement('textarea')
                textArea.value = text
                textArea.style.position = 'fixed'
                textArea.style.left = '-999999px'
                textArea.style.top = '-999999px'
                document.body.appendChild(textArea)
                textArea.focus()
                textArea.select()
                try {
                    document.execCommand('copy')
                    document.body.removeChild(textArea)
                    return true
                } catch {
                    document.body.removeChild(textArea)
                    return false
                }
            }
        } catch {
            return false
        }
    },

    /**
     * 从剪贴板读取文本
     * @returns 剪贴板文本
     */
    async readFromClipboard(): Promise<string> {
        try {
            if (navigator.clipboard && navigator.clipboard.readText) {
                return await navigator.clipboard.readText()
            }
            return ''
        } catch {
            return ''
        }
    },

    /**
     * 下载文件
     * @param url 文件URL
     * @param filename 文件名
     */
    downloadFile(url: string, filename?: string): void {
        const link = document.createElement('a')
        link.href = url
        if (filename) {
            link.download = filename
        }
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    },

    /**
     * 打开新窗口
     * @param url URL
     * @param target 目标
     * @param features 窗口特性
     */
    openWindow(url: string, target: string = '_blank', features?: string): Window | null {
        return window.open(url, target, features)
    },

    /**
     * 刷新页面
     */
    refresh(): void {
        window.location.reload()
    },

    /**
     * 跳转到指定URL
     * @param url 目标URL
     */
    navigate(url: string): void {
        window.location.href = url
    },

    /**
     * 获取URL参数
     * @param name 参数名
     * @returns 参数值
     */
    getUrlParam(name: string): string | null {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get(name)
    },

    /**
     * 获取所有URL参数
     * @returns 参数对象
     */
    getUrlParams(): Record<string, string> {
        const urlParams = new URLSearchParams(window.location.search)
        const params: Record<string, string> = {}
        urlParams.forEach((value, key) => {
            params[key] = value
        })
        return params
    },

    /**
     * 设置URL参数
     * @param params 参数对象
     * @param replace 是否替换历史记录
     */
    setUrlParams(params: Record<string, string>, replace: boolean = false): void {
        const url = new URL(window.location.href)
        Object.keys(params).forEach(key => {
            const value = params[key]
            if (value !== undefined) {
                url.searchParams.set(key, value)
            }
        })
        if (replace) {
            window.history.replaceState({}, '', url.toString())
        } else {
            window.history.pushState({}, '', url.toString())
        }
    },

    /**
     * 移除URL参数
     * @param names 参数名数组
     * @param replace 是否替换历史记录
     */
    removeUrlParams(names: string[], replace: boolean = false): void {
        const url = new URL(window.location.href)
        names.forEach(name => {
            url.searchParams.delete(name)
        })
        if (replace) {
            window.history.replaceState({}, '', url.toString())
        } else {
            window.history.pushState({}, '', url.toString())
        }
    },

    /**
     * 获取用户代理字符串
     * @returns 用户代理字符串
     */
    getUserAgent(): string {
        return navigator.userAgent
    },

    /**
     * 获取平台信息
     * @returns 平台信息
     */
    getPlatform(): string {
        const nav = navigator as any
        if (nav.userAgentData?.platform) {
            return nav.userAgentData.platform
        }
        return nav.platform || 'Unknown'
    },

    /**
     * 获取浏览器完整信息
     * @returns 浏览器信息
     */
    getBrowserInfo() {
        return {
            name: this.getBrowserName(),
            version: this.getBrowserVersion(),
            os: this.getOS(),
            language: this.getLanguage(),
            languages: this.getLanguages(),
            platform: this.getPlatform(),
            userAgent: this.getUserAgent(),
            type: this.getBrowserType(),
            isMobile: this.isMobile(),
            isPC: this.isPC(),
            isOnline: this.isOnline(),
            screen: this.getScreenInfo(),
            viewport: this.getViewportInfo()
        }
    }
}
