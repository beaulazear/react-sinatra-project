import React, { useState } from "react";

export default function ExerciseCard({ exercise, removeExerciseThenUpdate, addWorkout }) {

    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')

    const lastTwoWorkouts = exercise.workouts.slice(-2)

    function handleSetReps(e) {
        setReps(e.target.value)
    }

    function handleSetWeight(e) {
        setWeight(e.target.value)
    }

    function removeExercise() {
        fetch(`http://localhost:9292/exercises/${exercise.id}`, {
            method: "DELETE",
        })
        .then((r) => r.json())
        .then((d) => removeExerciseThenUpdate(d))
    }

    const newWorkout = {
        reps: reps,
        weight: weight,
        exercise_id: exercise.id
    }

    function handleWorkoutSubmit(e) {
        e.preventDefault()

        fetch("http://localhost:9292/workouts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newWorkout)
        })
            .then((r) => r.json())
            .then((d) => {
                addWorkout(d)
                setReps('')
                setWeight('')
            })
    }

    if (!exercise) return <h2>...loading</h2>

    return (
        <div className="exerciseCard">
            <h2>{exercise.name}</h2>
            <p>{exercise.description}</p>
            <form onSubmit={handleWorkoutSubmit} className="newWorkoutForm">
                <h3>Add New Workout:</h3>
                <p>Please use only whole numbers for input! Weight is in lbs.</p>
                <input type="text" placeholder="Reps" value={reps} onChange={handleSetReps}></input>
                <br></br>
                <input type="text" placeholder="Weight (lbs)" value={weight} onChange={handleSetWeight}></input>
                <br></br>
                <button type="sumit">Submit</button>
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
            <br></br>
            <button className="button-18" onClick={removeExercise}>Remove exercise</button>
        </div>
    )
}