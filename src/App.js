import './App.css';
import Todo from './components/Todo'
import Form from './components/Form';
import FilterButton from './components/FilterButton';

function App(props) {
  console.log(props.tasks)
  const taskLists = props.tasks.map(x => <Todo name={x.name} id={x.id} completed={x.completed} key={x.id} />)
  
  return (
    <div className="App">
      <h1>TodoMatic</h1>

      <Form/>
      <FilterButton/>
      <FilterButton/>
      <FilterButton/>
      
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
