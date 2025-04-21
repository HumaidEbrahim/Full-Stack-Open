import { useSelector, useDispatch } from 'react-redux'
import { addVote} from '../reducers/anecdoteReducer'
import { setNotifcation, clearNotification } from '../reducers/notificationReducer'


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
    
    const handleVote = (id) => {

        dispatch(addVote(id))
        dispatch(setNotifcation(`Voted! ${anecdotes.find(a => a.id === id).content}`))
        setTimeout(() =>{
            dispatch(clearNotification())},
        5000
        )
       
    }

    return(
        <div> 
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => handleVote(anecdote.id)}
                />
            )}
        </div>
    )
}

export default AnecdoteList