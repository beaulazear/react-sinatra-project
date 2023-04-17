import React, { useEffect, useState } from "react";

export default function WorkoutCard({ workout }) {

    return (
        <div className="workoutCard">
            {/* <h1>{workout.exercise.name}</h1> */}
            <h1>{workout.exercise}</h1>
            <h3>{workout.reps} reps @</h3>
            <h3>{workout.weight} lbs</h3>
        </div>
    )
}