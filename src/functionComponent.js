import React, { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

const Context = createContext('default')
const ItemsArray = () => {
    const [list, setList] = useState({ toDoListItems:[] })
    return (
        <Context.Provider value={[list,setList]}>
            <MyComponent />
        </Context.Provider>
    )
}

const MyComponent = () => {
    const [entry, setEntry] = useState({ taskInput: ''})
    
    const [list, setList] = useContext(Context);

    const handleChange = (event) => {
        setEntry({...entry, taskInput: event.target.value})
    }

    const completeTask = (input) => {
        const copyTodo = [...list.toDoListItems]
        for (let i = 0; i < copyTodo.length; i++) {
            if (copyTodo[i].description === input.description) {
                copyTodo[i].status = !copyTodo[i].status
            }
        }
        setList({
            ...list, toDoListItems: copyTodo
        })
    }

    const removeTask = (index) => {
        const todoCopy = [...list.toDoListItems]
        todoCopy.splice(index, 1)
        setList({
          ...list, toDoListItems: todoCopy
        })
      }
    
    useEffect(() => {
        fetch('http://localhost:3004/items')
            .then(resp => {
                return resp.json()
            })
            .then(resp => {
                setList({ ...list, toDoListItems: resp })
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
              value={list.toDoDescription}
              onChange={handleChange}
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                setList({
                  ...list, toDoListItems: [...list.toDoListItems, { status: false, description: entry.taskInput }]
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
              list.toDoListItems.map((input, index) => {
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

export default ItemsArray
