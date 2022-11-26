import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './styles.css';

const EditTask = ({ task, onTaskUpdated }) => {
    let history = useHistory();
    const [taskData, setTaskData] = useState({
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        unfinishedWork: task.unfinishedWork,
        finishedWork: task.finishedWork,
        completionStatus: task.completionStatus
    });
    const { taskName, taskDescription, unfinishedWork, finishedWork, completionStatus } = taskData;

    const onChange = e => {
        const { name, value } = e.target

        setTaskData({
            ...taskData,
            [name]: value
        });
    };

    const update = async () => {
        if(!taskName || !taskDescription || !unfinishedWork || !finishedWork || !completionStatus) {
            console.log('Please make sure every box is filled with something!');
        }
        else 
        {
            try {
                console.log(unfinishedWork);

                const res = await axios.put(
                    `http://localhost:5000/api/tasks/${task._id}`, {
                        taskName: taskName,
                        taskDescription: taskDescription,
                        unfinishedWork: unfinishedWork,
                        finishedWork: finishedWork,
                        completionStatus: completionStatus
                    }
                );

                onTaskUpdated(res.data);
                history.push('/');
            }
            catch (error)
            {
                console.error(`Error updating task: ${error.response.data}`)
            }
        }
    };

    return (
        <div className="form-container">
            <h1>Edit Task</h1>
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
            <h2>Finished Work:</h2>
            <textarea
                name="finishedWork"
                cols="30"
                rows="10"
                value={finishedWork}
                onChange={e => onChange(e)}
            ></textarea>
            <h1>Completion Status: </h1>
            <input
                name="completionStatus"
                type="text"            
                id="compStat"
                placeholder="{completionStatus}"
                value={completionStatus}
                onChange={e => onChange(e)}
                />
            <button onClick={() => update()}>Submit</button>
            <h2>Please make sure every box is filled with something!</h2>
        </div>
    );
};

export default EditTask;