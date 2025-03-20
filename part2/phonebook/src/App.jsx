import { useState } from 'react'

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


const Persons = (props) => 
{
  return (
    props.personsFiltered.map(p => <p key={p.id}> {p.name} {p.number} </p>)
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



const App = () =>
{

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addNumber = (event) =>
  {
    event.preventDefault()

    if (persons.some(person => person.name === newName))
    {
      alert(`${newName} is already added to the phonebook`)
    } else
    {
      setPersons([...persons, { name: newName, number: newNumber, id: persons.length + 1 }])
      setNewNumber('')
      setNewName('')

    }

  }

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleNameChange = (event) =>
    setNewName(event.target.value)


  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)


  const handleFilterChange = (event) =>
    setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons personsFiltered={personsFiltered}> </Persons>

    </div>
  )
}

export default App