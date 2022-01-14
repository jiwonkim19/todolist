import { getByPlaceholderText, render } from "@testing-library/react";
import React from 'react';

import MyComponent from "./functionComponent";

class App extends React.Component {
  render() {
    return (
      <MyComponent/>
    )
}
}
export default App
