import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTodo = () => {
    const { taskId } = useParams();
    const [task, setTask]= useState(null);
    const [error, setError] = useState('');
    const [isLoading ,setIsLoading] = useState(true);
    const navigate = useNavigate();


    //Fetch task data
    const fetchTask = async () => {
        try{
            const response = await fetch(`https://localhost:7105/api/Task/task-details?id=${taskId}`);

            if(!response.ok) {
                throw new Error("Failed to fetch task.");
            }

            const data = await response.json();
            setTask(data);
        }
        catch(err) {
            setError(err.message);
        }
        finally {
            setIsLoading(false)
        }
    }

    // Update task data  -> then go to task list
    const updateTask = async (e) => {
        e.preventDefault();

        try{
            const updatedTask = {
                ...task,
                isCompleted: task.isCompleted === 'true'
            }
            const response = await fetch(`https://localhost:7105/api/Task/update-task?id=${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });

            if(!response.ok) {
                if(response.status === 404) {
                    throw new Error("Task not found.");
                }
                throw new Error("Failed to update task.");
            }

            // redirect after success
            navigate('/');
        }
        catch(err) {
            setError(err.message);
        }
    }


    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setTask((prev) => ({
            ...prev, 
            [name]: value
        }));
    }

    useEffect(() => {
        fetchTask();
    }, [taskId])

  return (
    <div>
     <h1>Update Task</h1>

     {isLoading ? (
        <div>Loading Task...</div>
     ) : error ? (
        <div>{error}</div>
     ) : task ? (
        <form onSubmit={updateTask}>
            <div>
                <label>Id: </label>
                <input type="text"
                        value={taskId}
                        readOnly />
            </div>
            <div>
                <label>Task: </label>
                <input type="text"
                        name='taskName'
                        value={task.taskName}
                        onChange={handleInputChange} />
            </div>
            <div>
                <label>Description: </label>
                <input type="text"
                        name='description'
                        value={task.description} 
                        onChange={handleInputChange}/>
            </div>
            <div>
                <label>Status: </label>
                <select 
                        name='isCompleted'
                        value={task.isCompleted}
                        onChange={handleInputChange} >
                    <option value="true">Completed</option>
                    <option value="false">Not Completed</option>
                </select>
            </div>

            <button type='submit'>Update</button>
        </form>
     ) : (
        <div>Task not found</div>
     )}
       
    </div>
  )
}

export default UpdateTodo
