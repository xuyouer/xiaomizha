/**
 * 缓存操作工具类
 */
class CacheManager {
    private storage: Storage

    constructor(storage: Storage) {
        this.storage = storage
    }

    /**
     * 获取缓存数据
     * @param key 缓存键名
     * @returns 缓存的数据, 如果缓存不存在或已过期则返回null
     */
    get(key: string): any {
        try {
            const cached = this.storage.getItem(key)
            if (!cached) return null

            const parsed = JSON.parse(cached)
            if (parsed.expiry && parsed.expiry < Date.now()) {
                this.storage.removeItem(key)
                return null
            }
            return parsed.data
        } catch (error) {
            console.error('获取缓存失败:', error)
            return null
        }
    }

    /**
     * 设置缓存数据
     * @param key 缓存键名
     * @param data 要缓存的数据
     * @param expiry 过期时间（毫秒）
     */
    set(key: string, data: any, expiry: number): void {
        try {
            const cacheData = {
                data,
                expiry: Date.now() + expiry
            }
            this.storage.setItem(key, JSON.stringify(cacheData))
        } catch (error) {
            console.error('设置缓存失败:', error)
        }
    }

    /**
     * 清除缓存数据
     * @param key 缓存键名
     */
    remove(key: string): void {
        try {
            this.storage.removeItem(key)
        } catch (error) {
            console.error('清除缓存失败:', error)
        }
    }

    /**
     * 清空所有缓存数据
     */
    clear(): void {
        try {
            this.storage.clear()
        } catch (error) {
            console.error('清空所有缓存失败:', error)
        }
    }
}

export const localStorageCache = new CacheManager(localStorage)
export const sessionStorageCache = new CacheManager(sessionStorage)
