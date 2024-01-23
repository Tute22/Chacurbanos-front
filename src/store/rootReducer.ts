// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit'
import { dbDataSlice } from './slice/dbData/dataSlice'
import { userSlice } from './slice/userData/userSlice'
import { loadingSlice } from './slice/isLoading/loadingSlice'

const rootReducer = combineReducers({
    dbDataReducer: dbDataSlice.reducer,
    userReducer: userSlice.reducer,
    loadingReducer: loadingSlice.reducer,
})

export default rootReducer
