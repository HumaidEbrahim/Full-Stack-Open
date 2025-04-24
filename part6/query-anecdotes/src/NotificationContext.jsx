import {createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
    switch (action.type)
    {
        case 'setNotification':
            return action.payload
        case 'clearNotification':
            return 'Hello'
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, 'Hello')
    
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]} >
            {props.children}
        </NotificationContext.Provider>
    )
} 

// custom hooks
export const useNotificationValue = () => {
    const both = useContext(NotificationContext)
    return both[0]
}

export const useNotificationDispatch = () => {
    const both = useContext(NotificationContext)
    return both[1]
}

export default NotificationContext