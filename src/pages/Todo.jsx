import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as yup from "yup"

const Todo = () => {

    const [todos, setTodos] = useState()
    const [selectedTask, setSelectedTask] = useState({
        task: ""
    })

    const createTodo = async () => {
        try {
            const { data } = await axios.post("http://localhost:5000/todos", {
                task: "Learn React",
                complete: false
            })
            readTodo()
        } catch (error) {
            console.log(error)
        }
    }




    const readTodo = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/todos")
            console.log(data);
            setTodos(data)
        } catch (error) {
            console.log(error)
        }
    }




    const updateTodo = async (id, todoData) => {
        try {
            const { data } = await axios.patch(`http://localhost:5000/todos/${id}`, todoData)
            readTodo()
        } catch (error) {
            console.log(error)
        }
    }




    const deleteTodo = async id => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/todos/${id} `)
            console.log(data)
            readTodo()
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        readTodo()
    }, [])

    const todoTable = <table className="table table-dark table-striped table-hover">
        <thead>
            <tr>
                <th >Task</th>
                <th >Complete</th>
                <th >Action</th>
            </tr>
        </thead>
        <tbody>
            {
                todos && todos.map(item => <tr key={item.id}>
                    <td>{item.task}</td>
                    <td>{item.complete
                        ? <strong className='text-success'>Complete</strong>
                        : <strong className='text-danger'>In progress</strong>
                    }
                        <input
                            type="checkbox"
                            checked={item.complete}
                            onChange={e => updateTodo(item.id, { complete: e.target.checked })}
                            className='form-check-input mx-4 ' />
                    </td>
                    <td>
                        <button
                            data-bs-toggle="modal" data-bs-target="#editModal"
                            onClick={e => setSelectedTask(item)}
                            type="button" className="btn btn-outline-warning mx-2">
                            <i className='bi bi-pencil'></i>
                        </button>
                        <button type="button" className="btn btn-outline-danger mx-2" onClick={e => deleteTodo(item.id)}>
                            <i className='bi bi-trash'></i>
                        </button>
                    </td>
                </tr>)
            }
        </tbody>
    </table>

    return <>
        <div className="container my-3">
            <button type="button" className="btn btn-primary" onClick={createTodo}>Create</button>
            {todoTable}
        </div>



        <div className="modal fade" id="editModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" className='form-control'
                            onChange={e => setSelectedTask({ ...selectedTask, task: e.target.value })}
                            value={selectedTask.task} /><br />
                        <button data-bs-dismiss="modal"
                            onClick={e => updateTodo(selectedTask.id, { task: selectedTask.task })}
                            type="button" className="btn btn-outline-warning w-100 btn-lg">Update Todo</button>
                    </div>
                </div>
            </div>
        </div>


    </>
}

export default Todo