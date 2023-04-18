import './App.css';
import Exercises from './components/Exercises';
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
  function removeExerciseThenUpdate(removedExercise) {
    setExercises(exercises.filter((exercise) => exercise.id !== removedExercise.id))
  }

  return (
    <div>
      <Exercises exercises={exercises} addExercise={addExercise} removeExerciseThenUpdate={removeExerciseThenUpdate}/>
    </div>
  );
}

export default App;
