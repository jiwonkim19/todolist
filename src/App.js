import { getByPlaceholderText, render } from "@testing-library/react";
import React from 'react';

import ItemsArray from "./functionComponent";

class App extends React.Component {
  render() {
    return (
      <ItemsArray/>
    )
}
}
export default App
