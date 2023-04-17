import React, { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";

export default function Exercises(){

    const [exercises, setExercises] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/exercises")
        .then((r) => r.json())
        .then((d) => setExercises(d))
    },[])

    return(
        <div id="exercises">
            <h1>Exercises</h1>
            <ul id="exercisesUL">
                {exercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
            </ul>
        </div>
    )
}