import React, { useState } from 'react'
import './Todo.css'

const Todo = () => {
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const [edit, setEdit] = useState("")
    const [editId, setEditId] = useState("")
    const [completedtodos, setCompletedTodos] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            id: new Date().getTime(),
            text: todo,
            completed: false,
        }
        setTodos([...todos].concat(newTodo));
        setTodo("")
    }

    const handleDelete = (id) => {
        let deletedTodos = [...todos].filter((todo) => todo.id !== id)
        setTodos(deletedTodos)

        let deleteCompletedTodos = [...completedtodos].filter((todo) => todo.id !== id)
        setCompletedTodos(deleteCompletedTodos)
    }

    const handleEdit = (id) => {
        let editTodos = [...todos].map((todo) => {
            if(todo.id === id) {
                todo.text = edit
            }
            return todo
        })
        setTodos(editTodos)
        setEditId("")
    }

    const handleToggle = (id) => {
        let toggleTodos = [...todos].map((todo) => {
            if(todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        setTodos(toggleTodos)

        const completed = toggleTodos.filter((todo) => todo.completed)
        setCompletedTodos(completed)
    }

    const todosFilter = [...todos].filter((todo) => !todo.completed)

  return (
    <div className='container'>
        <div className='todo-input-bg'>
        <form onSubmit={handleSubmit}>
            <input className='todo-input' value={todo}  onChange={(e) => setTodo(e.target.value)} />
            <button disabled={!todo} className='todo-add' type="submit">Add</button>
        </form>
        </div>
        <div className='text-container'>
        {todosFilter.map((todo) => (
            <div className='todo-text' key={todo.id}>
                {
                    editId === todo.id ? (
                        <>
                            <form onSubmit={() => handleEdit(todo.id)}>
                            <div className='inner'>
                                <input style={{ outline: 'none', padding: '0.4rem',marginRight:'12rem' }} value={edit.title} onChange={(e) => setEdit(e.target.value)} />
                                <button type='submit'>Save</button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <div>{todo.text}</div>
                            <div className='inner'>
                                <input className={`check ${todo.completed ? "completed" : "not"}`} type='checkbox' onClick={() => handleToggle(todo.id)} />
                                <button onClick={() => setEditId(todo.id)}>Edit</button>
                                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                            </div>
                        </>
                    )
                }
            </div>
        ))}
        <hr></hr>
        {completedtodos.map((completed) => (
            <div className='todo-text gray' key={completed.id}>
            <div>{completed.text}</div>
            <div className='inner'>
            <input className={`check ${todo.completed ? "not" : "completed" }`} type='checkbox' onClick={() => handleToggle(completed.id)} />
            <button onClick={() => handleDelete(completed.id)}>Delete</button>
            </div>
        </div>
        ))}
        </div>
    </div>
  )
}

export default Todo