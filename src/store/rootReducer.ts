// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit'
import { dbDataSlice } from './slice/dbData/dataSlice'
import { userSlice } from './slice/userData/userSlice'

const rootReducer = combineReducers({
    dbDataReducer: dbDataSlice.reducer,
    userReducer: userSlice.reducer,
})

export default rootReducer
