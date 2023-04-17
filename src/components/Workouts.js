import React, { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";

export default function Workouts() {

    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/workouts")
        .then((r) => r.json())
        .then((d) => setWorkouts(d))
    }, [])

    return (
        <div id="workouts">
            <h1 className="pageHeaders">Workouts</h1>
            <ul id="workoutsUL">
            {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout}/>
                ))}
            </ul>
        </div>
    )
}