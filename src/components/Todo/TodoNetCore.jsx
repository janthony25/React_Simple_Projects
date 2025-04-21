import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const TodoNetCore = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [validationError, setValidationError] = useState({});
    const [newTask, setNewTask] = useState({
        taskName: "",
        description: ""
    });
    const [updateTaskData, setUpdateTaskData] = useState({
        taskId: "",
        taskName: "",
        description: "",
        isCompleted: ""
    });


    // Fetching task data from API
    const fetchTasks = async () => {
        setIsLoading(true);
        try{
            const response = await fetch('https://localhost:7105/api/Task/tasks');
            if(!response.ok) {
                throw new Error("Failed to fetch tasks.");
            }
            const data = await response.json();
            setTasks(data);
        }
        catch(err) {
            setError(err.message);
            console.log("Error fetching task.", err);
        }
        finally {
            setIsLoading(false);
        }
    }

    // handle add task inputs
    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setNewTask((prev) => ({
            ...prev,
            [name]: value
        }));

        console.log(name, value)
    }

    // Validate add task form
    const validateForm = () => {
        const {taskName} = newTask;
        const newError = {};

        if(!taskName.trim()) newError.taskName = "Please enter a task";
        
        setValidationError(newError);

        return Object.keys(newError).length === 0;
    }

    //  POST: Add new task 
    const addTask = async (e) => {
        e.preventDefault();

        if(!validateForm()) return;
        try{
            const response = await fetch('https://localhost:7105/api/Task/add-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });

            if(!response.ok) {
                throw new Error("Failed to add task");
            }

            const addedTask = await response.json();

            // Update task state with the new task
            setTasks([...tasks, addedTask]);

            // Reset form
            setNewTask({
                taskName: "",
                description: ""
            })
        }
        catch(err) {
            setError(err.Message);
            console.log("Error adding task", err);
        }
    }

    
  
    // DELETE: Delete a task
    const deleteTask = async(taskId) => {
        try{
            const response = await fetch(`https://localhost:7105/api/Task/delete-task?id=${taskId}`, {
                method: 'DELETE'
            });

            if(!response.ok){
                throw new Error("Failed to delete task.");
            }

            // Remove the deleted task from state
            setTasks(tasks.filter(task => task.taskId !== taskId));
        }
        catch(err) {
            setError(err.message);
            console.log("Error deleting task", err)
        }
    }

    useEffect(() => {
        fetchTasks();
    }, [])


  return (
    <div>
        <h1>Hello</h1>

        <h3>Add Task</h3>
        <form onSubmit={addTask}>
            <div>
                <label>Task: </label>
                <input type="text"
                        name='taskName'
                        value={newTask.taskName}
                        onChange={handleInputChange} />
                {validationError.taskName && <p style={{color: 'red'}}>{validationError.taskName}</p>}
            </div>
            <div>
                <label>Description: </label>
                <textarea type="text"
                          name='description'
                          value={newTask.description}
                          onChange={handleInputChange} />
            </div>
            <button type='submit'>Submit</button>
        </form>

        <div>
        <h3>Task List</h3>
        {isLoading ? (
            <div>Loading tasks...</div>
        ) : error ? (
            <div style={{color: 'red'}}>{error}</div>
        ) : (
           <ul>
                {tasks.map((task) => (
                    <li key={task.taskId}>
                        {task.taskId} - {task.taskName} - {task.description} - {task.isCompleted ? "(Completed)" : "(Not Completed)"}
                    
                    {/* Buttons */}
                    <Link to={`/updateTask/${task.taskId}`}>Update</Link>
                    <button onClick={() => deleteTask(task.taskId)}>Delete</button>
                    </li>
                ))}

           </ul>
        )}
        </div>
        
       
        
    </div>
  )
}

export default TodoNetCore
