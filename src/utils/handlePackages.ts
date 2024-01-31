import { Package } from '@/types/types'

export const handleDisplayPackages = (p: Package, selectedDay: any) => {
    let today = new Date().toLocaleDateString('es-AR').split('/')

    const day = today[0].length === 1 ? `0${today[0]}` : today[0]
    const month = today[1].length === 1 ? `0${today[1]}` : today[1]
    //@ts-expect-error -- no borrar :)🐷
    today = `${today[2]}-${month}-${day}`
    if (selectedDay) {
        let selectedDate = selectedDay.stringDate.split('/')
        selectedDate = `${selectedDate[2]}-${selectedDate[1]}-${selectedDate[0]}`
        if (selectedDate === p.date) {
            if (selectedDate < today && p.status === 'delivered') {
                return p
            } else if (p.status === 'pending' || p.status === 'disabled') {
                return p
            }
        }
    } else {
        //@ts-expect-error -- no borrar :)🐷
        if ((today === p.date && p.status === 'pending') || (today === p.date && p.status === 'disabled')) {
            return p
        }
    }
}
