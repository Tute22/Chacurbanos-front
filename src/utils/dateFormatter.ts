export const addZeros = (value: any) => {
    return value < 10 ? `0${value}` : value
}

export function dateFormater(date: any) {
    if (!date || date === '') return ''

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${year}-${addZeros(month)}-${addZeros(day)}`
}
