import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers:
  {
    vote(state, action) {
      const updatedAnecdote = action.payload
      console.log(updatedAnecdote)
      return state.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a )
    },

    newAnecdote(state, action) {
     state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, newAnecdote, setAnecdotes } = anecdoteSlice.actions

export const createAnecdote = (content) => {
  return async dispatch =>{
    const anecdote = await anecdoteService.createNew(content)
    dispatch(newAnecdote(anecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.updateVote(anecdote)
    dispatch(vote(updated))
  }
}
export default anecdoteSlice.reducer