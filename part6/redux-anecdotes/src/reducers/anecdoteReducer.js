import { createSlice, current } from '@reduxjs/toolkit'


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
export default anecdoteSlice.reducer