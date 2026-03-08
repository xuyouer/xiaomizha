import type { UserDetailDTO } from '@/types/api';

/**
 * 从用户详情对象中获取指定属性值
 *
 * 从 UserDetailDTO 对象的特定部分中获取指定属性的值，支持备用属性和默认值
 *
 * @template T - 返回值的类型
 * @param {UserDetailDTO | null} dto - 用户详情对象，可能为 null
 * @param {string | null} section - 要获取的属性所在的部分名称，例如 'user'、'userProfile' 等
 * @param {string} property - 要获取的属性名称
 * @param {T} defaultValue - 当属性不存在时返回的默认值
 * @param {string} [fallbackProperty] - 备用属性名称，当主属性不存在时尝试获取
 * @returns {T} - 获取到的属性值或默认值
 *
 * @example
 * // 获取用户ID，不存在时返回 undefined
 * const userId = getPropertyFromDetail<UserDetailDTO | null>(userDetail, 'user', 'userId', undefined, 'user_id');
 *
 * @example
 * // 获取用户昵称，不存在时返回空字符串
 * const nickname = getPropertyFromDetail<UserDetailDTO | null>(userDetail, 'userProfile', 'nickname', '');
 */
export function getPropertyFromDetail<T>(
    dto: UserDetailDTO | null,
    section: string | null,
    property: string,
    defaultValue: T,
    fallbackProperty?: string
): T {
    if (!dto || !section) return defaultValue

    // // 尝试直接访问section属性
    // let sectionObj: any = dto[section as keyof UserDetailDTO]
    // // 如果直接访问失败, 尝试通过索引访问
    // if (!sectionObj) {
    //     sectionObj = (dto as Record<string, any>)[section]
    // }
    // if (!sectionObj) return defaultValue
    // // 尝试获取属性值
    // let value: any = sectionObj[property as keyof typeof sectionObj]
    // // 如果获取失败且有备用属性, 尝试获取备用属性值
    // if (value === undefined && fallbackProperty) {
    //     value = sectionObj[fallbackProperty as keyof typeof sectionObj]
    // }
    // // 检查值是否存在且类型匹配
    // if (value !== undefined && value !== null) {
    //     // 对于数字类型, 确保返回数字
    //     if (typeof defaultValue === 'number' && typeof value === 'string') {
    //         const numValue = Number(value)
    //         if (!isNaN(numValue)) {
    //             return numValue as unknown as T
    //         }
    //     }
    //     // 对于字符串类型, 确保返回字符串
    //     if (typeof defaultValue === 'string' && typeof value !== 'string') {
    //         return String(value) as unknown as T
    //     }
    //     // 类型匹配时直接返回
    //     if (typeof value === typeof defaultValue) {
    //         return value as T
    //     }
    // }

    const sectionObj = (dto as unknown as Record<string, unknown>)[section]
    if (!sectionObj) return defaultValue

    const value = fallbackProperty
        ? (sectionObj as Record<string, unknown>)[property] ?? (sectionObj as Record<string, unknown>)[fallbackProperty]
        : (sectionObj as Record<string, unknown>)[property]
    if (value === undefined) {
        return defaultValue
    }
    if (defaultValue === undefined) {
        return value as T
    }
    return typeof value === typeof defaultValue ? value as T : defaultValue
}

export function getUserIdFromDetail(dto: UserDetailDTO | null): number | undefined {
    return getPropertyFromDetail<number | undefined>(
        dto, 'user', 'userId', undefined, 'user_id'
    )
}

export function getUsernameFromDetail(dto: UserDetailDTO | null): string {
    return getPropertyFromDetail<string>(
        dto, 'user', 'username', ''
    )
}

export function getNicknameFromDetail(dto: UserDetailDTO | null): string {
    return getPropertyFromDetail<string>(
        dto, 'userProfile', 'nickname', ''
    )
}

export function getCreateNameFromDetail(dto: UserDetailDTO | null): string {
    return getPropertyFromDetail<string>(
        dto, 'userNames', 'createName', '', 'create_name'
    )
}

export function getDisplayNameFromDetail(dto: UserDetailDTO | null): string {
    return getPropertyFromDetail<string>(
        dto, 'userNames', 'displayName', '', 'display_name'
    )
}

/**
 * 生成 XMZ ID
 *
 * 生成一个以 "xmzid_" 开头的随机字符串，长度默认为 16 个字符
 *
 * @param {number} [length=16] - 随机字符串部分的长度
 * @returns {string} - 生成的 XMZ ID
 */
export function generateXmzId(length = 16): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let suffix = ''

    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
        const bytes = new Uint8Array(length)
        crypto.getRandomValues(bytes)
        for (let i = 0; i < length; i++) {
            const b = bytes[i] ?? 0
            suffix += alphabet.charAt(b % alphabet.length)
        }
    } else {
        for (let i = 0; i < length; i++) suffix += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    }

    return `xmzid_${suffix}`
}

/**
 * 生成密码
 *
 * 生成一个包含大小写字母、数字和特殊字符的随机密码
 *
 * @param {number} [length=12] - 密码长度
 * @returns {string} - 生成的密码
 */
export function generatePassword(length = 12): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const allChars = uppercase + lowercase + numbers + symbols

    let password = ''

    // 确保密码包含至少一种每种类型的字符
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length))
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length))
    password += numbers.charAt(Math.floor(Math.random() * numbers.length))
    password += symbols.charAt(Math.floor(Math.random() * symbols.length))

    // 填充剩余长度
    for (let i = 4; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length))
    }

    // 打乱密码顺序
    return password.split('').sort(() => Math.random() - 0.5).join('')
}

/**
 * 生成昵称
 *
 * 生成一个随机昵称
 *
 * 格式为 "用户" + 随机字符
 *
 * @param {number} [length=8] - 昵称总长度
 * @returns {string} - 生成的昵称
 */
export function generateNickname(length = 8): string {
    const prefixes = ['快乐', '阳光', '星空', '梦想', '自由', '清风', '流水', '彩虹', '火焰', '闪电', '星光', '海洋', '森林', '山峰', '草原', '云朵', '月光', '晨曦', '黄昏', '秋叶', '冬雪', '春风', '夏雨', '秋霜', '冬阳', '云海', '雾松', '朝霞', '晚霞']
    const suffixes = ['达人', '守护者', '旅行者', '探险家', '创造者', '梦想家', '守望者', '开拓者', '领航员', '冒险家', '探索者', '实践者', '思考者', '行动者', '创新者', '传承者', '建设者', '航海家', '飞行员', '科学家', '艺术家', '工程师']
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz'

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]!
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]!

    // 计算随机字符的长度
    const randomLength = Math.max(0, length - prefix.length - suffix.length)
    let randomPart = ''

    for (let i = 0; i < randomLength; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return prefix + suffix + randomPart
}
