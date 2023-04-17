import React from "react";

export default function ExerciseCard({ exercise }) {
    return(
        <div className="exerciseCard">
            <li>{exercise.name}</li>
            <li>{exercise.description}</li>
        </div>
    )
}