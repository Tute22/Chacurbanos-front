import { createSlice } from '@reduxjs/toolkit'

export const dbDataSlice = createSlice({
    name: 'dbData',

    initialState: {
        data: null,
        selectedPackage: null,
        usersData: null,
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
    },
})

export const { setData, setSelectedPackage, setUsersData } = dbDataSlice.actions
export default dbDataSlice.reducer
