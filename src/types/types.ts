import { DateTime } from 'luxon'

export type Package = {
    _id: string
    address: string
    recipient: string
    weight: number
    date: string
    status: string
}

export enum UserRole {
    DELIVERY = 'delivery',
    ADMIN = 'admin',
}

export enum UserStatus {
    ENABLED = 'enabled',
    DISABLED = 'disabled',
}

export enum UserDay {
    PENDING = 'pending',
    IN_PROGRESS = 'in progress',
    FINISH = 'finish',
}

export type User = {
    _id: string
    name: string
    lastName: string
    email: string
    password: string
    role: UserRole.DELIVERY | UserRole.ADMIN
    status: UserStatus.ENABLED | UserStatus.DISABLED
    day: UserDay.PENDING | UserDay.IN_PROGRESS | UserDay.FINISH
    iconUrl: string
}

export interface DayData {
    info: DateTime
    number: number
    day: string | null
    time: string
}

export interface UserData {
    _id: string
    name: string
    lastName: string
    email: string
    password: string
    role: UserRole.DELIVERY | UserRole.ADMIN
    status: UserStatus.ENABLED | UserStatus.DISABLED
    day: UserDay.PENDING | UserDay.IN_PROGRESS | UserDay.FINISH
    iconUrl: string
}
