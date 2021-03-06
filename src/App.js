import './App.css';
import Todo from './components/Todo'
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import React, { useState, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

//part filter button (harus diulangkaji)
const FILTER_MAP = {
  All : () => true,
  Active : task => !task.completed,
  Completed : task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const listHeadingRef = useRef(null)

  const [tasks,setTasks] = useState([])

  const [filter,setFilter] = useState('All')

  const filterList = FILTER_NAMES.map(name => (<FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />))

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
    if(name.length === 0){
      return;
    }
    const newTask = {name: name, id : "todo-" + nanoid(), completed : false}
    setTasks([...tasks, newTask])
    // console.log(tasks)
  }

  //kaedah sendiri
  // function editTask(id, newName){
  //   const specificTask = tasks.find(task => task.id === id)
  //   specificTask.name = newName;
  //   console.log(tasks)
  //   setTasks([...tasks])
  // }

  //kaedah mdnwebdocs
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // console.log(tasks)
  const taskLists = tasks.filter(FILTER_MAP[filter])
                          .map(task => <Todo name={task.name} id={task.id} completed={task.completed} key={task.id} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask}
                                        editTask={editTask}/>)
  
  const taskRemaining = tasks.length;
  const taskNouns = tasks.length === 1 ? 'task' : 'tasks';
  const headerText = `${taskRemaining} ${taskNouns} remaining`; 
  
  // const prevTaskLength = usePrevious(tasks.length);
  const prevTaskLength = usePrevious(tasks.length);
  
  useEffect(()=>{
    if(tasks.length - prevTaskLength === -1){
      listHeadingRef.current.focus()
    }
  },[prevTaskLength,tasks.length])

  return (
    <div className="App">
      <h1>Todo Salik</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        {filterList}
      </div>

      <h2 id="list-heading"  tabIndex="-1" ref={listHeadingRef}>
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
