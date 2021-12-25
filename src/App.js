import logo from './logo.svg';
import './App.css';

import { render } from "@testing-library/react";

<h1>To Do List</h1>

class ToDoList React.Component {
    constructor(props) {
        super(props);
        this.state=  [
            {status: false,
             description: '' }
        ]
    }

    addToList(newText) {
        return (this.state.push({
            status: false,
            description: newText
        }))
    }

    }
    render() {
        <form id="newText">
            <input type="text" value={this.state.value} onChange={this.addToList}>
        </form>
        return (
            <button onClick={this.addToList}>
            '+'
            </button>
        )
    }
}
<input type="text" value={this.state.value} onChange={this.handleChange} />
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
