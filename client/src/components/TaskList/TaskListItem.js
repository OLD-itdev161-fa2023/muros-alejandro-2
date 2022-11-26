import React from 'react';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';
import './styles.css';

const TaskListItem = props => {
    const { task, clickTask, deleteTask, editTask } = props;
    const history = useHistory();

    const handleClickTask = task => {
        const slug = slugify(task.taskName, { lower: true });
        //const slugLink = '/tasks/${' + slug + '}';

        clickTask(task);
        history.push(`/tasks/${slug}`);
    };

    const handleEditTask = task => {
        editTask(task);

        history.push(`/edit-task/${task._id}`);
    };

    return (
        <div>
            <div className="taskListItem" onClick={() => handleClickTask(task)}>
                <h1>{task.taskName}</h1>
                <p><b>Task Description:</b> {task.taskDescription}</p>
                <p><b>Unfinished work:</b> {task.unfinishedWork}</p>
                <p><b>Finished work:</b> {task.finishedWork}</p>
                <p><b>completion status:</b> {task.completionStatus}</p>
            </div>
            <div className="taskControls">
                <button onClick={() => deleteTask(task)}>Delete</button>
                <button onClick={() => handleEditTask(task)}>Edit</button>
            </div>
        </div>
    );
};

export default TaskListItem;