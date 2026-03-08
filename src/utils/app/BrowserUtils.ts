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
    }
}
