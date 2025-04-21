import {  useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotifcation, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value 
        event.target.anecdote.value = ''

        const anecdote = await anecdoteService.createNew(content)
        dispatch(newAnecdote(anecdote))
        dispatch(setNotifcation(`Added! ${content}`))

        setTimeout(()=> {
            dispatch(clearNotification('Hello'))
        }, 5000)

    }
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form> 
        </div>
    )
}

export default AnecdoteForm
    