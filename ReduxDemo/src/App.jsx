import { createStore } from 'redux'

const counterReducer = (state, action) =>
{
  switch (action.type)
  {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () =>
{

  return(
    <div>
      <p>0</p>
    <div> 
      <button>plus</button>
      <button>minus</button>
      <button>zero</button>
    </div>
    </div>
  )
}

export default App