import { useSelector, useDispatch } from 'react-redux'
import { addVote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <div>
            {anecdote.content}
            <div> 
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
            </div>
      </div>
    )
}

const AnecdoteList = () => {
    
    const anecdotes = useSelector(({filter, anecdote}) => {
        const filtered = filter === ''
        ? anecdote
        : anecdote.filter(a =>
            a.content.toLowerCase().includes(filter.toLowerCase()))
            
        return [...filtered].sort((a, b) => b.votes - a.votes)
        })
   
    const dispatch = useDispatch()
    
    const handleVote = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(`You voted for "${anecdote.content}"`, 10000))
       
    }

    return(
        <div> 
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => handleVote(anecdote)}
                />
            )}
        </div>
    )
}

export default AnecdoteList