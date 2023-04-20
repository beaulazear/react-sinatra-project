import React, { useState } from "react";

export default function ExerciseCard({ exercise, removeExerciseThenUpdate, updateExercise }) {

    const [exerciseName, setExerciseName] = useState('')
    const [exerciseDesc, setExerciseDesc] = useState('')

    function handleExerciseName(e) {
        setExerciseName(e.target.value)
    }
    function handleExerciseDesc(e) {
        setExerciseDesc(e.target.value)
    }

    const lastTwoWorkouts = exercise.workouts.slice(-2)

    function removeExercise() {
        fetch(`http://localhost:9292/exercises/${exercise.id}`, {
            method: "DELETE",
        })
            .then((r) => r.json())
            .then((d) => removeExerciseThenUpdate(d))
    }

    function updateExerciseSubmit(e) {
        e.preventDefault()

        fetch(`http://localhost:9292/exercises/${exercise.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: exerciseName,
                description: exerciseDesc,
            }),
        })
        .then((r) => r.json())
        .then((d) => {
            updateExercise(d)
            setExerciseDesc('')
            setExerciseName('')
        })
    }

    if (!exercise) return <h2>...loading</h2>

    return (
        <div className="exerciseCard">
            <h2>{exercise.name}</h2>
            <p>{exercise.description}</p>
            <form id="newExerciseForm" onSubmit={updateExerciseSubmit}>
                <h3>Update Exercise:</h3>
                <input type="text" placeholder="Exercise Name" value={exerciseName} onChange={handleExerciseName}></input>
                <br></br>
                <textarea type="text" placeholder="Exercise Description" value={exerciseDesc} onChange={handleExerciseDesc}></textarea>
                <br></br>
                <button rows={8} cols={40} type="submit">Submit</button>
            </form>
            <p>Listed below are the weights used / reps completed for the last two times you've performed this exercise!</p>
            {/* how could I make an if statement here? ex.. if !exercise.workouts, return "No workouts yet!" */}
            <ul id="exerciseNewWorkoutUl">
                {lastTwoWorkouts.map((workout) => (
                    <div key={workout.id}>
                        <li>{workout.reps} reps at {workout.weight} lbs on {new Date(workout.created_at).toDateString()}</li>
                    </div>
                ))}
            </ul>
            <button className="button-18" onClick={removeExercise}>Remove exercise</button>
        </div>
    )
}