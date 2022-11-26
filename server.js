import express from "express";
import connectDatabase from "./config/db";
import { check, validationResult } from 'express-validator';
import cors from 'cors';
import Tasks from './models/Tasks'

//initialize express application
const app = express();

//connect database
connectDatabase();

//configure middleware
app.use(express.json({ extended: false }));
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

//API endpoints
/**
 * @route GET /
 * @desc Test endpoint
 */
app.get('/', (req,res) =>
    res.send('http get request sent to root api endpoint')
)

/**
* @route POST api/tasks
* @desc Add task
*/
app.post(
'/api/tasks', 
[
    check('taskName', 'Please enter the name of your task')
        .not()
        .isEmpty(),
    check('taskDescription', 'Please enter a description for your task')
        .not()
        .isEmpty(), 
    check('unfinishedWork', 'Please enter the work that still needs to be done for your task')
        .not()
        .isEmpty()
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        const { taskName, taskDescription, unfinishedWork } = req.body;
        try {
            //check if task exists
            let task = await Tasks.findOne({ taskName: taskName });
            if(task) {
                return res
                .status(400)
                .json({ errors: [{ msg: 'Task already listed' }] });
            }

            // create a new task
            task = new Tasks({
                taskName: taskName,
                taskDescription: taskDescription,
                unfinishedWork: unfinishedWork,
                finishedWork: 'N/A',
                completionStatus: 'Unfinished'
            });

            //save to the db and return
            await task.save();
        } catch(error) {
            res.status(500).send('Server error');
        }
    }
}
);

/**
 * @route get api/tasks
 * @desc get tasks
 */
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find().sort({ taskName: '' });

        res.json(tasks);
        res.send(tasks);
    } catch(error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

/**
 * @route get api/tasks/:id
 * @desc get task
 */
app.get('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id);

        //make sure the task was found
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        res.json(task);
    } catch(error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

/**
 * @route delete api/tasks/:id
 * @desc delete a task
 */
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id);

        //make sure the post was found
        if (!task) {
            return res.status(404).json({ msg: 'task not found' });
        }

        await task.remove();

        res.json({ msg: 'Task removed' });
    } catch(error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

/**
 * @route put api/tasks/:id
 * @desc update a task
 */
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { taskName, taskDescription, unfinishedWork, finishedWork, completionStatus } = req.body;
        const task = await Tasks.findById(req.params.id);

        //make sure the task was found
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        //update the task and return
        task.taskName = taskName || task.taskName
        task.taskDescription = taskDescription || task.taskDescription
        task.unfinishedWork = unfinishedWork || task.unfinishedWork
        task.finishedWork = finishedWork || task.finishedWork
        task.completionStatus = completionStatus || task.completionStatus

        await task.save();

        res.json(task);
    } catch(error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

//connection listener
const port = 5000;
app.listen(port, () => console.log('Express server running on port ${port}'));
