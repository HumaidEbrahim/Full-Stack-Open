import { useState } from "react"
import { EDIT_AUTHOR } from "../queries"
import {useMutation} from '@apollo/client'

const AuthorForm = ({authors}) => {
    const [name, setName] = useState('')
    const [year, setYear] = useState()

    const [changeAuthor, result] = useMutation(EDIT_AUTHOR)
    const submit = (event) => {
        event.preventDefault()
        changeAuthor({variables: {name,setBornTo:Number(year)}})
    }

    return (
        <div> 
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
            <div>
                name 
                <select value={name} onChange={({target}) => setName(target.value)} required>
                    <option value="">Select author</option>
                    {authors.map((a) => (
                        <option key={a.id} value={a.name}>{a.name}</option>
                    ))}
                </select>
            </div>
            <div>
                born <input value={year} onChange={({target}) => setYear(target.value)}/>
            </div>
            <button type="submit">update</button>
        </form>
        </div>
    )
}

export default AuthorForm