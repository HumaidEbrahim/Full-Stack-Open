import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, addVote} from './requests'
import { useContext } from 'react'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  
  const updatedAnecdoteMutation = useMutation({
    mutationFn: addVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })


  if(result.isLoading || result.isError){
    return <div>loading data...</div>
  }

  const anecdotes = result.data



  const handleVote = (anecdote) => {
    updatedAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})

    notificationDispatch({
      type: 'setNotification',
      payload: `You voted for '${anecdote.content}'`
    })

    setTimeout(() => {
      notificationDispatch({ type: 'clearNotification' })
    }, 5000)
  }


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
