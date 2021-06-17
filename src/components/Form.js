import React, {useState} from 'react'

function Form(props) {
    const [input,setInput] = useState('');

    function handleSubmit  (e) {
        e.preventDefault();
        props.addTask(input)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
                </h2>
                <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                onChange={e => {setInput(e.target.value)}}
                />
                <button type="submit" className="btn btn__primary btn__lg">
                Add
                </button>
            </form>
        </div>
    )
}

export default Form;
