import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers:
  {
    addVote(state, action) {
      const id = action.payload
      const anecdote= state.find(a => a.id === id)
      anecdote.votes += 1
    },

    newAnecdote(state, action) {
     state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }


  }
})

export const { addVote, newAnecdote, setAnecdotes } = anecdoteSlice.actions

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
export default anecdoteSlice.reducer