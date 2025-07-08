import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './Components/PersonForm'
import { ALL_PERSONS } from './queries'
import { useState } from 'react'
import PhoneForm from './Components/PhoneForm'


const App = () => {

  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)


  if (result.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  } 
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify}/>
      <Persons persons={result.data.allPersons}/>
      <PhoneForm setError={notify}/>
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if(!errorMessage) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}
export default App