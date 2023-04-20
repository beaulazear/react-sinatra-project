import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Exercises from './components/Exercises';
import Workouts from './components/Workouts';
import PageNavLinks from './components/PageNavLinks';
import Home from './components/Home';

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

  function updateExercise(newExercise) {

    const newArr = [...exercises]

    const index = newArr.findIndex(obj => obj.id = newExercise.id)

    if (index !== -1) {
      newArr[index] = newExercise
      setExercises(newArr)
    }
  }

  function removeExerciseThenUpdate(removedExercise) {
    setExercises(exercises.filter((exercise) => exercise.id !== removedExercise.id))
  }

  return (
    <div>
      <PageNavLinks />
      <Switch>
        <Route path="/exercises">
          <Exercises exercises={exercises} addExercise={addExercise} removeExerciseThenUpdate={removeExerciseThenUpdate} updateExercise={updateExercise} />
        </Route>
        <Route path="/workouts">
          <Workouts exercises={exercises} addWorkout={addWorkout}/>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
