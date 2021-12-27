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
