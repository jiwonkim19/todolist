import logo from './logo.svg';
import './App.css';

import { render } from "@testing-library/react";
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {    this.setState({value: event.target.value});  }
  render() {
    return (
      <form id="newText">
        <input type="text" value= {this.state.value} onChange={this.handleChange}/>
      </form>
    )
  }
}
export default App;