import React from "react";
import { NavLink } from "react-router-dom";

export default function PageNavLinks() {
    return (
        <div className="pageNavLinks">
            <NavLink to="/" className="navButtons">Home</NavLink>
            <NavLink to="/exercises" className="navButtons">Exercises</NavLink>
            <NavLink to="/workouts" className="navButtons">Workouts</NavLink>
        </div>
    )
}