import React, {
    useEffect,
    useState,
    createContext,
    useContext,
    useReducer
} from 'react';

const initialState = {
    list: [
        {
            status: false,
            description: "haha"
        }
    ]
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'submit':
            return {
                ...state,
                list: [...state.list, { status: false, description: action.payload }]
            };
        case 'removetask':
            const todoCopy = [...state.list]
            const index = action.payload
            todoCopy.splice(index, 1)
            return {
                ...state,
                list: todoCopy
            }
        case 'completetask':
            const copyTodo = [...state.list]
            for (let i = 0; i < copyTodo.length; i++) {
                if (copyTodo[i].description === action.payload.description) {
                    copyTodo[i].status = !copyTodo[i].status

                }
            }
            return {
                ...state,
                list: copyTodo
            }
    }
}


const TodoList = () => {
    const [entry, setEntry] = useState('')

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (event) => {
        setEntry(event.target.value)
    }

    // const completeTask = (input) => {
    //     const copyTodo = [...list]
    //     for (let i = 0; i < copyTodo.length; i++) {
    //         if (copyTodo[i].description === input.description) {
    //             copyTodo[i].status = !copyTodo[i].status
    //         }
    //     }
    //     setList({
    //         ...list, toDoListItems: copyTodo
    //     })
    // }


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
                            value={entry}
                            onChange={handleChange}
                        />
                        <button
                            // type="submit"
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch({ type: 'submit', payload: entry })
                                // fetch('http://localhost:3004/items', {
                                //     method: 'POST',
                                //     headers: { "Content-Type": "application/json" },
                                //     body: JSON.stringify({ status: false, description: entry.taskInput })
                                // }).then(() => {
                                //     console.log('task added to DB')
                                // })

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
                            state.list.map((input, index) => {
                                return (
                                    <div>
                                        <li>
                                            {input.description}
                                            <input
                                                type="checkbox"
                                                checked={input.status}
                                                onChange={
                                                    (e) => {
                                                        e.preventDefault()
                                                        dispatch({ type: 'completetask', payload: input })
                                                    }
                                                }
                                            />
                                        </li>

                                        <input
                                            type="button"
                                            onClick={
                                                () => {
                                                    dispatch({ type: 'removetask', payload: index })
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

export default TodoList