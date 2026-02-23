import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const THEME_KEY = 'xiaomizha_theme'
const THEME_PRIMARY_KEY = 'xiaomizha_theme_primary'

export type ThemeMode = 'light' | 'dark'

export interface ThemeColor {
    value: string
    name: string
}

export const PRIMARY_COLORS: ThemeColor[] = [
    { value: '#1890FF', name: '默认蓝' },
    { value: '#00B96B', name: '青绿' },
    { value: '#722ED1', name: '紫色' },
    { value: '#EB2F96', name: '粉色' },
    { value: '#2F54EB', name: '蓝色' },
    { value: '#FA541C', name: '橙红' },
    { value: '#007AB8', name: '海洋蓝' },
    { value: '#00C1D5', name: '水蓝' },
    { value: '#07C160', name: '深绿' },
    { value: '#10AEFF', name: '浅蓝' },
    { value: '#6467F0', name: '淡紫' },
    { value: '#78BE20', name: '叶绿' },
    { value: '#B145E9', name: '紫罗兰' },
    { value: '#DC3545', name: '鲜红' },
    { value: '#FD7E14', name: '橙黄' },
    { value: '#556644', name: '不焦绿' },
    { value: '#614E6F', name: '绝绝紫' },
    { value: '#375361', name: '不摆蓝' },
    { value: '#7A6143', name: '糖太棕' },
    { value: '#4B7560', name: '放青松' },
    { value: '#AE5052', name: '发财红' },
] as const

function getStoredTheme(): ThemeMode {
    const v = localStorage.getItem(THEME_KEY)
    return v === 'dark' ? 'dark' : 'light'
}

function getStoredPrimary(): string {
    return localStorage.getItem(THEME_PRIMARY_KEY) || (PRIMARY_COLORS[0]?.value || '#1890FF')
}

export const useThemeStore = defineStore('theme', () => {
    const mode = ref<ThemeMode>(getStoredTheme())
    const primaryColor = ref<string>(getStoredPrimary())

    function applyToDocument(): void {
        if (typeof document === 'undefined') return
        document.documentElement.setAttribute('data-theme', mode.value)
        document.documentElement.style.setProperty('--primary-color', primaryColor.value)
        document.documentElement.style.setProperty(
            '--primary-color-hover',
            adjustColor(primaryColor.value, 20)
        )
        document.documentElement.style.setProperty(
            '--primary-color-active',
            adjustColor(primaryColor.value, -10)
        )
    }

    watch(mode, () => {
        localStorage.setItem(THEME_KEY, mode.value)
        applyToDocument()
    }, { immediate: true })

    watch(primaryColor, () => {
        localStorage.setItem(THEME_PRIMARY_KEY, primaryColor.value)
        applyToDocument()
    }, { immediate: true })

    function setMode(m: ThemeMode): void {
        mode.value = m
    }

    function setPrimary(color: string): void {
        primaryColor.value = color
    }

    function toggleMode(): void {
        mode.value = mode.value === 'light' ? 'dark' : 'light'
    }

    return {
        mode,
        primaryColor,
        setMode,
        setPrimary,
        toggleMode,
    }
})

/** 调整颜色亮度 */
function adjustColor(hex: string, percent: number): string {
    if (!hex || hex.length < 7) return hex
    const num = parseInt(hex.slice(1), 16)
    const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + (percent * 2.55)))
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + (percent * 2.55)))
    const b = Math.min(255, Math.max(0, (num & 0xff) + (percent * 2.55)))
    return '#' + (0x1000000 + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1)
}
