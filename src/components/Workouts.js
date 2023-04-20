import React from "react";
import WorkoutCard from "./WorkoutCard";

export default function Workouts({ exercises, addWorkout }) {
    return (
        <div id="workoutsDiv">
            <h1 className="pageHeaders">Workouts</h1>
            {exercises.map((exercise) => (
                <WorkoutCard key={exercise.id} exercise={exercise} addWorkout={addWorkout} />
            ))}
        </div>
    )
}