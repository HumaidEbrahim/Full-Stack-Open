import { useSelector, useDispatch } from 'react-redux'
import { addVote, newAnecdote } from '../reducers/anecdoteReducer'
import { filterChange } from '../reducers/filterReducer'

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
        if(filter === '')
            return anecdote
        else
            return anecdote.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    return(
        <div> 
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => dispatch(addVote(anecdote.id))}
                />
            )}
        </div>
    )
}

export default AnecdoteList