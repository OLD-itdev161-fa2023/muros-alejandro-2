import React from 'react';

const Task = props => {
    const { task } = props;
    
    return (
        <div>
            <h1>{task.taskName}</h1>
            <p>{task.taskDescription}</p>
            <p>Unfinished work: {task.unfinishedWork}</p>
            <p>Finished work: {task.finishedWork}</p>
        </div>
    )
}

export default Task;