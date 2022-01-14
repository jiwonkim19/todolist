import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [entry, setEntry] = useState({ taskInput: ''});
  const [list, setList] = useState({ toDoListItems:[] });

  const handleChange = (event) => {
    setEntry({
      taskInput: event.target.value
    })
  }

  const completeTask = (input) => {
    const copyTodo = [...list.toDoListItems]
    for (let i = 0; i < copyTodo.length; i++) {
      if (copyTodo[i].description === input.description) {
        copyTodo[i].status = !copyTodo[i].status
      }
    }
    setList({
      toDoListItems: copyTodo
    })
  }

  const removeTask = (index) => {
    const todoCopy = [...list.toDoListItems]
    todoCopy.splice(index, 1)
    setList({
      toDoListItems: todoCopy
    })
  }

  useEffect(() => {
    fetch('http://localhost:3005/items')
      .then(resp => {
        return resp.json()
      })
      .then(resp => {
        setList({toDoListItems: resp })
      })
  }
  )

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
      <h1> Todo List</h1>
      <h2>
        <form id="newText">
          <input
            type="text"
            placeholder="Enter task..."
            value={list.toDoDescription}
            onChange={handleChange}
          />
          <button
            type="submit"
            onChange={(e) => {
              e.preventDefault()
              setList({
                toDoListItems: [...list.toDoListItems, { task: entry.taskInput, status: false }]
              })
              fetch('http://localhost:3005/items', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task: entry.taskInput, status: false })
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
            list.toDoListItems.map((input, index) => {
              return (
                <div>
                  <li
                    onClick={
                      () => {
                        completeTask(input)
                        fetch('http://localhost:3005/item', {
                          method: 'PUT',
                          headers: { "Content-Type": "application/json" },
                          body: JSON.strigify({ input })
                        }).then(() => {
                          console.log('status changed')
                        })
                      }
                    }
                  >
                    {input.task}
                    <input
                      type="checkbox"
                      checked={input.status}
                    />
                  </li>

                  <input
                    type="button"
                    onClick={
                      () => {
                        removeTask(index)
                        fetch('http://localhost:3005/items', {
                          method: 'DELETE',
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ input })
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

export default MyComponent 
