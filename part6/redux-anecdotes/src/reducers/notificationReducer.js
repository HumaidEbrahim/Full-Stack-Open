import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'Hello',
    reducers:{
        changeNotification(state, action){
            return action.payload
        },
        clearNotification(state, action){
            return 'Hello'
        }
    }
})

export const { changeNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, timeout = 5000) => {
    return async dispatch => {
      dispatch(changeNotification(message))
      setTimeout(() => {
        dispatch(clearNotification())
      }, timeout)
    }
  }
export default notificationSlice.reducer