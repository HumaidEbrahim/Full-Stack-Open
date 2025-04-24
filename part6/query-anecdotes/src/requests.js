import axios from 'axios'
import anecdotes from '../../redux-anecdotes/src/services/anecdotes'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
    axios.get(baseUrl).then(res => res.data)

export const addAnecdote = (newAnecdote) => 
    axios.post(baseUrl, newAnecdote).then(res => res.data)

export const addVote = (updatedAnecdote) =>
    axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)

  
