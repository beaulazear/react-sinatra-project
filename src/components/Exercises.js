import React, { useState } from "react";
import ExerciseCard from "./ExerciseCard";

export default function Exercises({ exercises, addExercise, removeExerciseThenUpdate }) {

    const [newExerciseName, setNewExerciseName] = useState('')
    const [newExerciseDescription, setNewExerciseDescription] = useState('')
    
    function handleAddNewExerciseName(e) {
        setNewExerciseName(e.target.value)
    }
    function handleAddNewExerciseDescription(e) {
        setNewExerciseDescription(e.target.value)
    }

    const newExercise = {
        name: newExerciseName,
        description: newExerciseDescription
    }

    function handleFormSubmit(e) {
        e.preventDefault()

        fetch("http://localhost:9292/exercises", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExercise)
        })
            .then((r) => r.json())
            .then((d) => {
                console.log(d)
                addExercise(d)

                setNewExerciseDescription('')
                setNewExerciseName('')
            })
    }

    if (!exercises) return <h2>...loading</h2>

    return (
        <div id="exercises">
            <h1 className="pageHeaders">Exercise / Workout Log</h1>
            <div className="newExerciseFormDiv">
                <form id="newExerciseForm" onSubmit={handleFormSubmit}>
                    <h2>New Exercise Form</h2>
                    <input type="text" placeholder="Exercise Name" value={newExerciseName} onChange={handleAddNewExerciseName}></input>
                    <br></br>
                    <textarea type="text" placeholder="Exercise Description" value={newExerciseDescription} onChange={handleAddNewExerciseDescription}></textarea>
                    <br></br>
                    <button rows={8} cols={40} type="submit">Submit</button>
                </form>
            </div>
            {exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} removeExercise={removeExerciseThenUpdate}/>
            ))}
        </div>
    )
}