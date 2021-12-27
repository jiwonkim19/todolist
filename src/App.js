import logo from './logo.svg';
import './App.css';

import { getByPlaceholderText, render } from "@testing-library/react";
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskInput: '',
      toDoListItems: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.completeTask = this.completeTask.bind(this)
  }

  handleChange = (event) => {
    this.setState({
      taskInput: event.target.value
    });
  }

  completeTask = (input) => {
    const copyTodo = [...this.state.toDoListItems]
    for (let i = 0; i < copyTodo.length; i++) {
      if (copyTodo[i].description === input.description) {
        copyTodo[i].status = !copyTodo[i].status
      }
    }
    this.setState({
      toDoListItems: copyTodo
    })
  }


  render() {
    return (
      <div>
        <h1> To Do List</h1>
        <h2>
          <form id="newText">
            <input
              type="text"
              placeholder="Enter task..."
              value={this.state.toDoDescription}
              onChange={this.handleChange}
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                this.setState({
                  toDoListItems: [...this.state.toDoListItems, { status: false, description: this.state.taskInput }]
                })
              }
              }
            >
              +
            </button>
          </form>
        </h2>
        <h2>
          <ul>
            {
              this.state.toDoListItems.map((input) => {
                return (
                  <li
                    onClick={
                      () => {
                        this.completeTask(input)
                      }
                    }
                  >
                    <input
                      type="checkbox"
                      checked={input.status}
                      onChange={
                        (e) => {
                          // e.preventDefault()
                          // this.completeTask(input)
                        }
                      }
                    />
                    {input.description}
                  </li>
                )
              })
            }
          </ul>
        </h2>
      </div>
    )
  }
}
export default App;
