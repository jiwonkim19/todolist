import { getByPlaceholderText, render } from "@testing-library/react";
import React from 'react';

import TodoList from "./TodoList";

class App extends React.Component {
  render() {
    return (
      <TodoList/>
    )
}
}
export default App
