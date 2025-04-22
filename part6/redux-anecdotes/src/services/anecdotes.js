import axios from 'axios'
import { vote } from '../reducers/anecdoteReducer'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() =>
{
    
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) =>
{
    const newAnecdote = {
        content: content,
        votes: 0
    }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const updateVote = async (anecdote) => {

    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const response = await axios.put(baseUrl+`/${anecdote.id}`,updatedAnecdote)
    return response.data
    
}

export default { getAll, createNew, updateVote } 