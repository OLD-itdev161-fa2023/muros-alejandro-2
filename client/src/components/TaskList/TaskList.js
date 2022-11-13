import React from 'react';
import TaskListItem from './TaskListItem';

const TaskList = props => {
    const { tasks, clickTask} = props;
    return tasks.map(task => (
        <TaskListItem
            key={task._id}
            task={task}
            clickTask={clickTask}
        />
    ));
};

export default TaskList;