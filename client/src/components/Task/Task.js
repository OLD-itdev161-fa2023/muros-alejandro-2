import React from 'react';
import './styles.css';

const Task = props => {
    const { task } = props;
    
    return (
        <div className="taskCard">
            <h1>{task.taskName}</h1>
            <p><b>Task Description:</b> {task.taskDescription}</p>
            <p><b>Unfinished work:</b> {task.unfinishedWork}</p>
            <p><b>Finished work:</b> {task.finishedWork}</p>
            <p><b>completion status:</b> {task.completionStatus}</p>
        </div>
    )
}

export default Task;