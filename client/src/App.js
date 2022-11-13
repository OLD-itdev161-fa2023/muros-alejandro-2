import React from 'react';
import './App.css';
import axios from 'axios';
//import { response } from 'express';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import TaskList from './components/TaskList/TaskList';
import Task from './components/Task/Task';

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

  render(){
    let { tasks, task } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          Task Manager
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <React.Fragment>
                <TaskList tasks={tasks} clickTask={this.viewTask} />
              </React.Fragment>
            </Route>
            <Route path="/tasks/:taskId">
              <Task task={task} />
            </Route>
          </Switch>

            <button>Add task</button>
            <button>Update task</button>
            <button>Delete task</button>
        </main>
      </div>
    );
  }
}

export default App;
