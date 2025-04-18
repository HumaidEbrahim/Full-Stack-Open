import { useState } from 'react'

const Button = (props) =>
    <button onClick={props.onClick}> {props.text} </button>

const Anecdote = (props) =>
    <p> {props.anecdote} has {props.count} votes </p>


const App = () =>
{
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]


    const [selected, setSelected] = useState(0)
    const [votes, setVote] = useState(Array(anecdotes.length).fill(0))

    console.log(selected)
    console.log(votes)

    const nextAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
    const handleVote = () => 
    {
        const copy = [...votes]
        copy[selected] += 1
        setVote(copy)
    }
    const mostVotes = votes.indexOf(Math.max(...votes))
    console.log("Max: ", mostVotes)

    return (
        <div>
            <h1> Anecdote of the day </h1>
            <Anecdote anecdote={anecdotes[selected]} count={votes[selected]} />
            <br></br>
            <Button onClick={handleVote} text="vote" />
            <Button onClick={nextAnecdote} text="next anecdote" />

            <h1> Anecdote with most votes </h1>
            <Anecdote anecdote={anecdotes[mostVotes]} count={votes[mostVotes]} />
        </div >
    )
}

export default App