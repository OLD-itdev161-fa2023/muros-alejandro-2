import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './styles.css';
import { json } from 'express';

const TaskCreator = () => {
    let history = useHistory();
    const [taskData, setTaskData] = useState({
        taskName: '',
        taskDescription: '',
        unfinishedWork: ''
    });
    const [errorData, setErrorData] = useState({ errors: null });

    const { taskName, taskDescription,unfinishedWork } = taskData;
    const { errors } = errorData;

    const onChange = e => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        })
    }

    const createTask = async () => {
        if(!taskName || !taskDescription || !unfinishedWork)
        {
            console.log('Please fill out every text box');
        }

        else
        {
            const newTask ={
                taskName: taskName,
                taskDescription: taskDescription,
                unfinishedWork: unfinishedWork
            }
    
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                /*const body = JSON.stringify(newTask);
                const res = await axios.post{
                    'http://localhost:5000/api/posts',
                    body,
                    conig
                };*/


            }
    
            catch (error) {
                setErrorData({
                    ...error,
                    errors: error.response.data.errors
                })
            }
        }
    }

    return (
        <div>
            <h2>Log in</h2>
            <div>
                <input
                    type="text"
                    placeholder="Task Name"
                    name="taskName"
                    value={taskName}
                    onChange={e => onChange(e)} />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Task Description"
                    name="taskDescription"
                    value={taskDescription}
                    onChange={e => onChange(e)} />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Unfinished Work"
                    name="unfinishedWork"
                    value={unfinishedWork}
                    onChange={e => onChange(e)} />
            </div>
            <div>
                <button onClick={() => createTask()}>Log In</button>
            </div>
            <div>
                {errors && errors.map(error =>
                    <div key={error.msg}>{error.msg}</div>)}
            </div>
        </div>
    )  
}

export default TaskCreator;