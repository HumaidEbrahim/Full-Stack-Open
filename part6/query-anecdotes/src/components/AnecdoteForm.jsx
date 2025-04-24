import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addAnecdote } from '../requests'
import {useNotificationDispatch} from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({type: 'setNotification', payload: `Added ${data.content}`})
    },
    onError: () => {
      notificationDispatch({type: 'setNotification', payload: 'too short anecdote, must have length 5 or more'})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes:0})

    setTimeout(() => {
      notificationDispatch({type: 'clearNotification'})
    }, 5000)
  }
    
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
