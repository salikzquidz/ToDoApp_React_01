import './App.css';
import Todo from './components/Todo'
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import React, { useState } from 'react'

function App(props) {
  function addTask(name) {
    alert(name)
  }
  const [tasks,setTasks] = useState(props.tasks)
  console.log(tasks)
  const taskLists = tasks.map(task => <Todo name={task.name} id={task.id} completed={task.completed} key={task.id} />)
  
  
  return (
    <div className="App">
      <h1>Todo Salik</h1>

      <Form addTask={addTask}/>

      <div className="filters btn-group stack-exception">
        <FilterButton/>
        <FilterButton/>
        <FilterButton/>
      </div>

      <h2 id="list-heading">
        3 tasks remaining
      </h2>

      <ul
        // role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >

        {taskLists}
      </ul>

    </div>
  );
}

export default App;
