import { useState, useEffect } from 'react'
import personsService from './personsService'
import './index.css'

const PersonForm = (props) =>
{
  return (
    <form onSubmit={props.addNumber}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Person = ({ person, handleRemove }) => 
{
  return (
    <p>
      {person.name}  {person.number}
      <button onClick={handleRemove}>delete</button>
    </p>
  )
}

const Filter = (props) =>
{
  return (
    <div>
      filter shown with < input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  )
}

const Notification = ({ message, type }) =>
{
  if (!message)
    return null

  return (
    <div className={type === 'success' ? 'notification success' : 'notification failure'}>
      {message}
    </div >
  )
}

const App = () =>
{

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() =>
  {
    personsService.getAll()
      .then(response =>
      {
        setPersons(response)
        console.log("GET", response)
      })
  }, [])

  const showNotification = (message, type) =>
  {
    setNotification({ message, type })
    setTimeout(() => 
    {
      setNotification('', '')
    }, 5000)
  }


  const updateNumber = (person) => 
  {
    const updatePerson = { ...person, number: newNumber }
    personsService.update(updatePerson.id, updatePerson)
      .then(response =>
      {
        setPersons(persons.map(p => p.id === updatePerson.id ? response : p))
        showNotification(`Number for ${updatePerson.name} has been updated`, 'success')
      })
  }

  const addNumber = (event) =>
  {
    event.preventDefault()

    if (persons.some(person => person.name === newName))
    {

      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
        updateNumber(persons.find(person => person.name === newName))
      setNewNumber('')
      setNewName('')

    }
    else
    {
      const newObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }

      personsService.create(newObject)
        .then(returnedPerson =>
        {
          setPersons([...persons, returnedPerson])
          setNewNumber('')
          setNewName('')
          showNotification(`Added ${returnedPerson.name}`, 'success')

        })
    }
  }


  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleNameChange = (event) =>
    setNewName(event.target.value)


  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)


  const handleFilterChange = (event) =>
    setNewFilter(event.target.value)

  const handleRemove = (id) => 
  {
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${name} ?`))
    {
      personsService.remove(id)
        .then(() =>
        {
          showNotification(`${name} has been deleted`, 'success')
        })
        .catch(() =>
        {
          showNotification(`${name} has already been removed`, 'failure')
        })

      setPersons(persons.filter(p => p.id !== id))
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />


      <h2> add a new </h2>
      <PersonForm
        addNumber={addNumber}
        newNumber={newNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      {personsFiltered.map(p =>
        <Person key={p.id} person={p} handleRemove={() => handleRemove(p.id)} />
      )}

    </div>
  )
}

export default App