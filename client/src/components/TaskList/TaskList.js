import React from 'react';
import TaskListItem from './TaskListItem';

const TaskList = props => {
    const { tasks, clickTask, deleteTask, editTask } = props;
    return tasks.map(task => (
        <TaskListItem
            key={task._id}
            task={task}
            clickTask={clickTask}
            deleteTask={deleteTask}
            editTask={editTask}
        />
    ));
};

export default TaskList;