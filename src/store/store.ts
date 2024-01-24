import { configureStore } from '@reduxjs/toolkit'
import { dbDataSlice } from './slice/dbData/dataSlice'
import { userSlice } from './slice/userData/userSlice'

export const store = configureStore({
    reducer: {
        dbDataReducer: dbDataSlice.reducer,
        userReducer: userSlice.reducer,
    },
})
