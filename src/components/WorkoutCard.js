import React from "react";
import { useState } from "react";

export default function WorkoutCard({ exercise, handleWorkoutSubmit, addWorkout }) {

    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')

    const lastTenWorkouts = exercise.workouts.slice(-10)

    function handleSetReps(e) {
        setReps(e.target.value)
    }

    function handleSetWeight(e) {
        setWeight(e.target.value)
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
    return (
        <div className="workoutCardDiv">
            <form onSubmit={handleWorkoutSubmit} className="newWorkoutForm">
                <h2>{exercise.name}</h2>
                <h3>Add New Workout:</h3>
                <p>Please use only whole numbers for input! Weight is in lbs.</p>
                <input type="text" placeholder="Reps" value={reps} onChange={handleSetReps}></input>
                <br></br>
                <input type="text" placeholder="Weight (lbs)" value={weight} onChange={handleSetWeight}></input>
                <br></br>
                <button type="submit">Submit</button>
                <p>See last 10 workouts below</p>
                <ul id="exerciseNewWorkoutUl">
                    {lastTenWorkouts.map((workout) => (
                        <div key={workout.id}>
                            <li>{workout.reps} reps at {workout.weight} lbs on {new Date(workout.created_at).toDateString()}</li>
                        </div>
                    ))}
                </ul>
            </form>
        </div>
    )
}