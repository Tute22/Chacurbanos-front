import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'userData',

    initialState: {
        loginUserData: null,
        selectedUserData: null,
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.loginUserData = payload
        },
        setSelectedUserData: (state, { payload }) => {
            state.selectedUserData = payload
        },
    },
})

export const { setUser, setSelectedUserData } = userSlice.actions
export default userSlice.reducer
