import { createSlice } from '@reduxjs/toolkit'
import { initializeConnect } from 'react-redux/es/components/connect'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'Hello',
    reducers:{
        setNotifcation(state, action){
            return action.payload
        },
        clearNotification(state, action){
            return 'Hello'
        }
    }
})

export const { setNotifcation, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer