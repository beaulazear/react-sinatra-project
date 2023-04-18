import './App.css';
import Exercises from './components/Exercises';
import ExerciseCard from './components/ExerciseCard';
import { useState, useEffect } from 'react';


function App() {

  const [exercises, setExercises] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/exercises")
      .then((r) => r.json())
      .then((d) => setExercises(d))
  }, [])

  function addExercise(newExercise) {
    setExercises([...exercises, newExercise])
  }
  console.log(exercises)

  function addWorkout(newWorkout) {

    const exercise = exercises.find((elem) => elem.id === newWorkout.exercise_id)

    const updatedWorkouts = [...exercise.workouts, newWorkout]
    exercise.workouts = updatedWorkouts

    let newArr = [...exercises]

    const index = newArr.findIndex(obj => obj.id === exercise.id)
    
    if (index !== -1) {
      newArr[index] = exercise
      setExercises(newArr)
    }
  }

  function removeExerciseThenUpdate(removedExercise) {
    setExercises(exercises.filter((exercise) => exercise.id !== removedExercise.id))
  }

  return (
    <div>
      <Exercises exercises={exercises} addExercise={addExercise} />
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} removeExerciseThenUpdate={removeExerciseThenUpdate} addWorkout={addWorkout}/>
      ))}
    </div>
  );
}

export default App;
