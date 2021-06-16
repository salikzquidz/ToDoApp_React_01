import React from 'react'

function Todo(props) {
    
    return (
        <div>
            <li className="todo stack-small">
            <div className="c-cb">
                <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={()=> props.toggleTaskCompleted(props.id)} />
                <label className="todo-label" htmlFor={props.id}>
                {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn">
                Edit
                </button>
                <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>
                Delete
                </button>
            </div>
            </li>
        </div>
    )
}

export default Todo
