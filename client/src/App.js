import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import TaskList from './components/TaskList/TaskList';
import Task from './components/Task/Task';
import CreateTask from './components/Task/CreateTask';
import EditTask from './components/Task/EditTask';

class App extends React.Component {
  state = {
    tasks: [],
    task: null
  };

  componentDidMount() {
    axios.get('http://localhost:5000')
    .then((response) => {
      this.setState({
        data: response.data
      })
    })
    .catch((error) => {
      console.error('Error fetching data: ${error}');
    })

    this.loadData();
  }

  loadData = () => {
    axios
      .get('http://localhost:5000/api/tasks')
      .then(response => {
        this.setState({
          tasks: response.data
        });
      })
      .catch(error => {
        console.error('Error fetching data: ${error}');
      });
  };

  viewTask = task => {
    console.log('view ${task.taskName}');
    this.setState({
      task: task
    });
  };

  deleteTask = task => {
    axios
      .delete(`http://localhost:5000/api/tasks/${task._id}`)
      .then( response => {
        const newTasks = this.state.tasks.filter(p => p._id !== task._id);
        this.setState({
          tasks: [...newTasks]
        });
      })
      .catch(error => {
        console.error('Error deleting task: ${error}');
      });
  };

  editTask = task => {
    this.setState({
      task: task
    });
  };

  onTaskCreated = task => {
    const newTasks = [...this.state.tasks, task];

    this.setState({
      tasks: newTasks
    });
  };

  onTaskUpdated = task => {
    console.log('updated task: ', task)
    const newTasks = [...this.state.tasks];
    console.log(task._id);
    console.log(newTasks.findIndex(p => p._id === task._id));
    const index = newTasks.findIndex(p => p._id === task._id);
    
    newTasks[index] = task;

    this.setState({
      tasks: newTasks
    });
  };

  render(){
    let { tasks, task } = this.state;
    
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Task Manager</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/new-task">New Task</Link>
              </li>
            </ul>
          </header>
          <main>
            <Switch>
              <Route exact path="/">
                <React.Fragment>
                  <TaskList 
                    tasks={tasks} 
                    clickTask={this.viewTask} 
                    deleteTask={this.deleteTask}  
                    editTask={this.editTask}
                  />
                </React.Fragment>
              </Route>
              <Route path="/tasks/:taskId">
                <Task task={task} />
              </Route>
              <Route path="/new-task">
                <CreateTask onTaskCreated={this.onTaskCreated} />
              </Route>
              <Route path="/edit-task/:taskId">
                <EditTask
                  task={task}
                  onTaskUpdated={this.onTaskUpdated}
                />
              </Route>
            </Switch>
          </main>
        
        </div>
      </Router>
    );
  }
}

export default App;
