export interface ExportColumn {
    key: string
    title: string
    width?: number
}

export interface ExportOptions {
    filename?: string
    addBOM?: boolean
}

export class ExportUtils {
    static exportToCSV<T extends Record<string, any>>(
        data: T[],
        columns: ExportColumn[],
        options: ExportOptions = {}
    ): void {
        const {filename = `export_${Date.now()}.csv`, addBOM = true} = options

        const headers = columns.map(col => col.title)
        const rows = data.map(item => columns.map(col => this.formatCell(item[col.key])))

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n')

        const content = addBOM ? '\uFEFF' + csvContent : csvContent
        const blob = new Blob([content], {type: 'text/csv;charset=utf-8;'})
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    private static formatCell(value: any): string {
        if (value === null || value === undefined) {
            return '""'
        }
        const stringValue = String(value)
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`
        }
        return `"${stringValue}"`
    }
}
