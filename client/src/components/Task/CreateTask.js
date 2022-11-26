import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './styles.css';

const CreateTask = ({ onTaskCreated }) => {
    let history = useHistory();
    const [taskData, setTaskData] = useState({
        taskName: '',
        taskDescription: '',
        unfinishedWork: ''
    });
    const { taskName, taskDescription, unfinishedWork } = taskData;

    const onChange = e => {
        const { name, value } = e.target

        setTaskData({
            ...taskData,
            [name]: value
        });
    };

    const create = async () => {
        if(!taskName || !taskDescription || !unfinishedWork) {
            console.log('Please fill out every text box!');
        }

        else 
        {
            try {
                history.push('/');
                
                const res = await axios.post(
                    `http://localhost:5000/api/tasks`, {
                        taskName: taskName,
                        taskDescription: taskDescription,
                        unfinishedWork: unfinishedWork,
                    }
                );

                onTaskCreated(res.data);
            }
            catch (error)
            {
                console.error(`Error creating post: ${error.response.data}`)
            }
        }
    };

    return (
        <div className="form-container">
            <h1>Create New Task</h1>
            <h2>Task Name:</h2>
            <input
                name="taskName"
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={e => onChange(e)}
            />
            <h2>Task Description:</h2>
            <textarea
                name="taskDescription"
                cols="30"
                rows="10"
                value={taskDescription}
                onChange={e => onChange(e)}
            ></textarea>
            <h2>Unfinished Work:</h2>
            <textarea
                name="unfinishedWork"
                cols="30"
                rows="10"
                value={unfinishedWork}
                onChange={e => onChange(e)}
            ></textarea>
            <button onClick={() => create()}>Submit</button>

            <h2>Refresh the page to see the new task</h2>
        </div>
    );
};

export default CreateTask;