import React, { useEffect, useState } from 'react';

const MyComponent = () => {
    const [entry, setEntry] = useState({ taskInput: '', toDoListItems: [] })
    
    const handleChange = (event) => {
        setEntry({...entry, taskInput: event.target.value})
    }

    const completeTask = (input) => {
        const copyTodo = [entry.toDoListItems]
        for (let i = 0; i < copyTodo.length; i++) {
            if (copyTodo[i].description === input.description) {
                copyTodo[i].status = !copyTodo[i].status
            }
        }
        setEntry({
            ...entry, toDoListItems: copyTodo
        })
    }

    const removeTask = (index) => {
        const todoCopy = [entry.toDoListItems]
        todoCopy.splice(index, 1)
        setEntry({
          ...entry, toDoListItems: todoCopy
        })
      }
    
    useEffect(() => {
        fetch('http://localhost:3004/items')
            .then(resp => {
                return resp.json()
            })
            .then(resp => {
                setEntry({ ...entry, toDoListItems: resp })
            })
    }
    )

    
    return (
        <>
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
              value={entry.toDoDescription}
              onChange={handleChange}
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                setEntry({
                  ...entry, toDoListItems: [...entry.toDoListItems, { status: false, description: entry.taskInput }]
                })
                fetch('http://localhost:3004/items', {
                  method: 'POST',
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: false, description: entry.taskInput })
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
              entry.toDoListItems.map((input, index) => {
                return (
                  <div>
                    <li
                      onClick={
                        () => {
                          completeTask(input)
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
                          removeTask(index)
                          fetch('http://localhost:3004/items', {
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
        </>
    )
}

export default MyComponent
