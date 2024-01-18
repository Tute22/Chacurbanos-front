import { configureStore } from '@reduxjs/toolkit'
import { dbDataSlice } from './slice/dbData/dataSlice'
import { userSlice } from './slice/userData/userSlice'
import { loadingSlice } from './slice/isLoading/loadingSlice'

export const store = configureStore({
    reducer: {
        dbDataReducer: dbDataSlice.reducer,
        userReducer: userSlice.reducer,
        loadingReducer: loadingSlice.reducer,
    },
})
