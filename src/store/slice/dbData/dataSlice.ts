import { createSlice } from '@reduxjs/toolkit'

export const dbDataSlice = createSlice({
    name: 'dbData',

    initialState: {
        data: null,
        selectedPackage: {
            _id: '',
            address: '',
            recipient: '',
            weight: 0,
            date: '',
            status: '',
        },
        usersData: null,
        selectedDay: '',
    },
    reducers: {
        setData: (state, { payload }) => {
            state.data = payload
        },
        setSelectedPackage: (state, { payload }) => {
            state.selectedPackage = payload
        },
        setUsersData: (state, { payload }) => {
            state.usersData = payload
        },
        setSelectedDay: (state, { payload }) => {
            state.selectedDay = payload
        },
    },
})

export const { setData, setSelectedPackage, setUsersData, setSelectedDay } = dbDataSlice.actions
export default dbDataSlice.reducer
