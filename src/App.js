import { getByPlaceholderText, render } from "@testing-library/react";
import React from 'react';

import ClassComponent from './classComponent'

class App extends React.Component {
  render() {
    return (
      <ClassComponent/>
    )
  }
}
export default App
