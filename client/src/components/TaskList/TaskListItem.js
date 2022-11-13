import React from 'react';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';
import './styles.css';

const TaskListItem = props => {
    const { task, clickTask } = props;
    const history = useHistory();

    const handleClickTask = task => {
        const slug = slugify(task.taskName, { lower: true });
        const slugLink = '/tasks/${' + slug + '}';

        clickTask(task);
        history.push(slugLink);
    };

    return (
        <div>
            <div className="taskListItem" onClick={() => handleClickTask(task)}>
                <h2>{task.taskName}</h2>
                <p>{task.taskDescription}</p>
                <p>Unfinished work: {task.unfinishedWork}</p>
                <p>Finished work: {task.finishedWork}</p>
            </div>
        </div>
    );
};

export default TaskListItem;