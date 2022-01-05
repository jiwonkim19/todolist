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
    this.removeTask = this.removeTask.bind(this)
  }

  handleChange = (event) => {
    this.setState({
      taskInput: event.target.value
    })
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

  removeTask = (index) => {
    const todoCopy = [...this.state.toDoListItems]
    todoCopy.splice(index, 1)
    this.setState({
      toDoListItems: todoCopy
    })
  }

  componentDidMount() {
    fetch('http://localhost:3004/items')
      .then(resp => {
        return resp.json()
      })
      .then(resp => {
        this.setState({ toDoListItems: resp })
      })
  }

  render() {
    return (
      <div
        style={{
          textAlign: "center",
          maxWidth: "950px",
          margin: "0 auto",
          border: "1px solid #e6e6e6",
          padding: "40px 25px",
          marginTop: "50px"
        }}
      >
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
                fetch('http://localhost:3004/items', {
                  method: 'POST',
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: false, description: this.state.taskInput })
                }).then(() => {
                  console.log('task added to DB')
                })
              }
              }
            >
              +
            </button>
          </form>
        </h2>
        <h2>
          <ol>
            {
              this.state.toDoListItems.map((input, index) => {
                return (
                  <div>
                    <li
                      onClick={
                        () => {
                          this.completeTask(input)
                        }
                      }
                    >
                      {input.description}
                      <input
                        type="checkbox"
                        checked={input.status}
                      />
                    </li>

                    <input
                      type="button"
                      onClick={
                        () => {
                          this.removeTask(index)
                          fetch('http://localhost:3004/items', {
                            method: 'DELETE',
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ index })
                          }).then(() => {
                            console.log('task deleted')
                          })
                        }
                      } />
                  </div>
                )

              })
            }
          </ol>
        </h2>
      </div>
    )
  }
}
export default App