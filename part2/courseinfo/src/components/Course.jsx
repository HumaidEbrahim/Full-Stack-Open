const Header = (props) => <h1>{props.course}</h1>

const Content = (props) =>
    props.parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)

const Part = (props) =>
{
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Total = (props) =>
{
    return (
        <p>Number of exercises {props.parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
    )
}

const Course = (props) =>
{
    return (
        props.courses.map(course =>
            <div key={course.id}>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </div>
        )
    )
}

export default Course