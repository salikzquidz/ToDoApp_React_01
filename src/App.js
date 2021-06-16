import './App.css';
import Todo from './components/Todo'
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import React, { useState } from 'react'
import { nanoid } from 'nanoid';

function App(props) {
  const [tasks,setTasks] = useState(props.tasks)

  //guna kaedah sendiri XD - guna find
  function toggleTaskCompleted(id){
    const specificTask = tasks.find(task => task.id === id)
    specificTask.completed === false ? specificTask.completed = true : specificTask.completed = false
    // console.log(specificTask)
  }

  //guna spread operator - dan map
  // function toggleTaskCompleted(id) {
  //   const updatedTasks = tasks.map(task => {
  //     // if this task has the same ID as the edited task
  //     if (id === task.id) {
  //       // use object spread to make a new object
  //       // whose `completed` prop has been inverted
  //       return {...task, completed: !task.completed}
  //     }
  //     return task;
  //   });
  //   setTasks(updatedTasks);
  // }

  function deleteTask(id){
    const remainingTasks = tasks.filter(task => task.id !== id)  
    setTasks(remainingTasks);
  }

  function addTask(name) {
    const newTask = {name: name, id : "todo-" + nanoid(), completed : false}
    setTasks([...tasks, newTask])
    // console.log(tasks)
  }

  
  console.log(tasks)
  const taskLists = tasks.map(task => <Todo name={task.name} id={task.id} completed={task.completed} key={task.id} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask}/>)
  
  const taskRemaining = tasks.length;
  const taskNouns = tasks.length === 1 ? 'task' : 'tasks';
  const headerText = `${taskRemaining} ${taskNouns} remaining`; 
  
  return (
    <div className="App">
      <h1>Todo Salik</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        <FilterButton/>
        <FilterButton/>
        <FilterButton/>
      </div>

      <h2 id="list-heading">
        {headerText}
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
