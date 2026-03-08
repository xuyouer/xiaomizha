/**
 * 对象工具类
 * <p/>
 * 提供各种对象操作相关的工具方法
 */
export class ObjectUtils {

    /**
     * 过滤数组中的对象, 只保留指定的键
     * @param array 要过滤的对象数组(可为 undefined/null, 此时返回空数组)
     * @param keys 要保留的键数组
     * @returns 过滤后的新数组
     */
    static filterByKeys<T extends Record<string, any>>(
        array: T[] | undefined | null,
        keys: (keyof T)[]
    ): Partial<T>[] {
        if (array == null || !Array.isArray(array) || array.length === 0) {
            return []
        }

        return array.map(item => {
            const filtered: Partial<T> = {}
            keys.forEach(key => {
                if (key in item) {
                    filtered[key] = item[key]
                }
            })
            return filtered
        })
    }

    /**
     * 根据条件过滤数组中的对象
     * @param array 要过滤的对象数组(可为 undefined/null, 此时返回空数组)
     * @param conditions 过滤条件对象, 键值对形式
     * @returns 符合条件的新数组
     */
    static filterByConditions<T extends Record<string, any>>(
        array: T[] | undefined | null,
        conditions: Partial<T>
    ): T[] {
        if (array == null || !Array.isArray(array) || array.length === 0) {
            return []
        }

        return array.filter(item => {
            return Object.entries(conditions).every(([key, value]) => {
                return item[key] === value
            })
        })
    }

    /**
     * 根据键值对过滤并选择特定键
     * @param array 要过滤的对象数组(可为 undefined/null, 此时返回空数组)
     * @param conditions 过滤条件
     * @param keys 要选择的键(可选, 不传则返回完整对象)
     * @returns 过滤并选择后的新数组
     */
    static filterAndSelect<T extends Record<string, any>>(
        array: T[] | undefined | null,
        conditions: Partial<T>,
        keys?: (keyof T)[]
    ): Partial<T>[] {
        const filtered = this.filterByConditions(array, conditions)

        if (!keys || keys.length === 0) {
            return filtered
        }

        return this.filterByKeys(filtered, keys)
    }

    /**
     * 深度过滤对象, 支持嵌套对象和数组
     * @param obj 要过滤的对象(可为 undefined/null, 此时返回空对象)
     * @param filterFn 过滤函数, 返回true保留该属性
     * @returns 过滤后的新对象
     */
    static deepFilter<T extends Record<string, any>>(
        obj: T | undefined | null,
        filterFn: (key: string, value: any, path: string[]) => boolean
    ): Partial<T> {
        if (obj == null) {
            return {} as Partial<T>
        }
        // 定义遍历函数, 明确返回类型
        const traverse = (
            currentObj: any,
            currentPath: string[] = []
        ): any => {
            // 处理数组
            if (Array.isArray(currentObj)) {
                const filteredArray = currentObj
                    .map((item, index) =>
                        traverse(item, [...currentPath, index.toString()])
                    )
                    .filter(item => item !== undefined)

                return filteredArray.length > 0 ? filteredArray : undefined
            }

            // 处理对象
            if (currentObj && typeof currentObj === 'object') {
                const filteredObj: Record<string, any> = {}

                Object.keys(currentObj).forEach(key => {
                    const newPath = [...currentPath, key]
                    const value = currentObj[key]

                    if (filterFn(key, value, newPath)) {
                        const filteredValue = traverse(value, newPath)
                        if (filteredValue !== undefined) {
                            filteredObj[key] = filteredValue
                        }
                    }
                })

                return Object.keys(filteredObj).length > 0 ? filteredObj : undefined
            }

            // 处理基本类型
            return currentObj
        }

        const filtered = traverse(obj)
        return filtered as Partial<T>
    }

    /**
     * 深度过滤对象, 支持嵌套对象和数组
     * @param obj 要过滤的对象(可为 undefined/null, 此时返回空对象)
     * @param filterFn 过滤函数, 返回true保留该属性
     * @returns 过滤后的新对象
     */
    static deepFilterE<T extends Record<string, any>>(
        obj: T | undefined | null,
        filterFn: (key: string, value: any, path: string[]) => boolean
    ): Partial<T> {
        if (obj == null) {
            return {} as Partial<T>
        }
        const traverse = (
            currentObj: any,
            currentPath: string[] = []
        ): any => {
            // 处理数组
            if (Array.isArray(currentObj)) {
                return currentObj.reduce<any[]>((acc, item, index) => {
                    const filteredItem = traverse(item, [...currentPath, index.toString()])
                    if (filteredItem !== undefined) {
                        acc.push(filteredItem)
                    }
                    return acc
                }, [])
            }

            // 处理对象
            if (currentObj && typeof currentObj === 'object' && !Array.isArray(currentObj)) {
                const result: Record<string, any> = {}

                for (const [key, value] of Object.entries(currentObj)) {
                    const newPath = [...currentPath, key]

                    // 检查是否应该保留此属性
                    if (filterFn(key, value, newPath)) {
                        const filteredValue = traverse(value, newPath)
                        if (filteredValue !== undefined) {
                            result[key] = filteredValue
                        }
                    }
                }

                return Object.keys(result).length > 0 ? result : undefined
            }

            // 处理基本类型值
            return currentObj
        }

        return traverse(obj) as Partial<T>
    }

    /**
     * 深度过滤对象, 支持更多选项
     * @param obj 要过滤的对象(可为 undefined/null, 此时返回空对象)
     * @param options
     */
    static deepFilterEx<T extends Record<string, any>>(
        obj: T | undefined | null,
        options: {
            filterFn?: (key: string, value: any, path: string[]) => boolean
            includeKeys?: string[]
            excludeKeys?: string[]
            stopAtKeys?: string[] // 遇到这些键时停止递归
            maxDepth?: number // 最大递归深度
        } = {}
    ): Partial<T> {
        if (obj == null) {
            return {} as Partial<T>
        }
        const {
            filterFn,
            includeKeys,
            excludeKeys,
            stopAtKeys = [],
            maxDepth = Infinity,
        } = options

        const shouldIncludeKey = (key: string): boolean => {
            // 如果指定了包含键, 只包含这些键
            if (includeKeys && includeKeys.length > 0) {
                return includeKeys.includes(key)
            }

            // 如果指定了排除键, 排除这些键
            if (excludeKeys && excludeKeys.length > 0) {
                return !excludeKeys.includes(key)
            }

            // 使用自定义过滤函数
            return true
        }

        const traverse = (
            currentObj: any,
            currentPath: string[] = [],
            depth = 0
        ): any => {
            // 检查最大深度
            if (depth > maxDepth) {
                return currentObj
            }

            // 处理数组
            if (Array.isArray(currentObj)) {
                return currentObj.reduce<any[]>((acc, item, index) => {
                    const filteredItem = traverse(
                        item,
                        [...currentPath, index.toString()],
                        depth + 1
                    )
                    if (filteredItem !== undefined) {
                        acc.push(filteredItem)
                    }
                    return acc
                }, [])
            }

            // 处理对象
            if (currentObj && typeof currentObj === 'object' && !Array.isArray(currentObj)) {
                const result: Record<string, any> = {}

                for (const [key, value] of Object.entries(currentObj)) {
                    const newPath = [...currentPath, key]

                    // 检查是否应该处理此键
                    let shouldProcess = shouldIncludeKey(key)

                    // 应用自定义过滤函数
                    if (filterFn) {
                        shouldProcess = shouldProcess && filterFn(key, value, newPath)
                    }

                    if (shouldProcess) {
                        // 检查是否需要停止递归
                        if (stopAtKeys.includes(key)) {
                            result[key] = value
                        } else {
                            const filteredValue = traverse(value, newPath, depth + 1)
                            if (filteredValue !== undefined) {
                                result[key] = filteredValue
                            }
                        }
                    }
                }

                return Object.keys(result).length > 0 ? result : undefined
            }

            // 处理基本类型值
            return currentObj
        }

        return traverse(obj) as Partial<T>
    }

    /**
     * 从对象数组中提取特定键的值数组
     * @param array 对象数组(可为 undefined/null, 此时返回空数组)
     * @param key 要提取的键
     * @returns 值数组
     */
    static extractValues<T extends Record<string, any>, K extends keyof T>(
        array: T[] | undefined | null,
        key: K
    ): T[K][] {
        if (array == null || !Array.isArray(array) || array.length === 0) {
            return []
        }

        return array
            .map(item => item[key])
            .filter((value): value is T[K] => value !== undefined && value !== null)
    }

    /**
     * 从对象数组中提取特定键的值并拼接为字符串(用于展示, 如角色名列表)
     * @param array 对象数组(可为 undefined/null, 此时返回空字符串)
     * @param key 要提取的键
     * @param separator 分隔符, 默认 ', '
     * @returns 拼接后的字符串
     */
    static extractValuesAsString<T extends Record<string, any>, K extends keyof T>(
        array: T[] | undefined | null,
        key: K,
        separator: string = ', '
    ): string {
        const values = this.extractValues(array, key)
        if (values.length === 0) {
            return ''
        }
        return values.map(String).join(separator)
    }

    /**
     * 将对象数组转换为键值对映射
     * @param array 对象数组(可为 undefined/null, 此时返回空 Map)
     * @param keyField 作为键的字段
     * @param valueField 作为值的字段(可选, 不传则返回整个对象)
     * @returns 键值对映射
     */
    static toMap<T extends Record<string, any>, K extends keyof T, V extends keyof T = never>(
        array: T[] | undefined | null,
        keyField: K,
        valueField?: V
    ): Map<T[K], V extends never ? T : T[V]> {
        const map = new Map() as Map<T[K], V extends never ? T : T[V]>

        if (array == null || !Array.isArray(array) || array.length === 0) {
            return map
        }

        type MapValue = V extends never ? T : T[V]
        array.forEach(item => {
            const key = item[keyField]
            const value = (valueField ? item[valueField] : item) as MapValue
            map.set(key, value)
        })

        return map
    }

    /**
     * 根据多个条件排序对象数组
     * @param array 对象数组(可为 undefined/null, 此时返回空数组)
     * @param sortConfig 排序配置数组
     * @returns 排序后的新数组
     */
    static sortByMultiple<T extends Record<string, any>>(
        array: T[] | undefined | null,
        sortConfig: Array<{
            key: keyof T
            order: 'asc' | 'desc'
        }>
    ): T[] {
        if (array == null || !Array.isArray(array) || array.length === 0) {
            return []
        }

        const arrayCopy = [...array]

        arrayCopy.sort((a, b) => {
            for (const config of sortConfig) {
                const { key, order } = config
                const aValue = a[key]
                const bValue = b[key]

                if (aValue === bValue) {
                    continue
                }

                const comparison = aValue < bValue ? -1 : 1
                return order === 'asc' ? comparison : -comparison
            }

            return 0
        })

        return arrayCopy
    }

    /**
     * 分组对象数组
     * @param array 对象数组(可为 undefined/null, 此时返回空对象)
     * @param key 分组的键
     * @returns 分组后的对象
     */
    static groupBy<T extends Record<string, any>, K extends keyof T>(
        array: T[] | undefined | null,
        key: K
    ): Record<string, T[]> {
        if (array == null || !Array.isArray(array) || array.length === 0) {
            return {}
        }

        return array.reduce((groups, item) => {
            const groupKey = String(item[key])
            if (!groups[groupKey]) {
                groups[groupKey] = []
            }
            groups[groupKey].push(item)
            return groups
        }, {} as Record<string, T[]>)
    }

    /**
     * 对象数组去重
     * @param array 对象数组(可为 undefined/null, 此时返回空数组)
     * @param key 用于去重的键(可选, 不传则基于整个对象去重)
     * @returns 去重后的新数组
     */
    static unique<T extends Record<string, any>, K extends keyof T = never>(
        array: T[] | undefined | null,
        key?: K
    ): T[] {
        if (array == null || !Array.isArray(array) || array.length === 0) {
            return []
        }

        const seen = new Set()
        return array.filter(item => {
            const identifier = key ? item[key] : JSON.stringify(item)
            if (seen.has(identifier)) {
                return false
            }
            seen.add(identifier)
            return true
        })
    }

}

export default ObjectUtils