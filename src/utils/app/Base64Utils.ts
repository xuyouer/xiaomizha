const modules = import.meta.glob('@/assets/base64/*', {eager: true, query: '?raw', import: 'default'})

const base64Map: Record<string, string> = {}

Object.keys(modules).forEach(path => {
    const fileName = path.split('/').pop()
    if (fileName) {
        base64Map[fileName] = modules[path] as string
    }
})

export const Base64Utils = {
    get(name: string): string {
        return base64Map[name] || ''
    },

    has(name: string): boolean {
        return !!base64Map[name]
    },

    names(): string[] {
        return Object.keys(base64Map)
    }
}
