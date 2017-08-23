import React, { Component } from "react";
import "./App.css";
import GameBoard from "./GameBoard.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameBoard />
      </div>
    );
  }
}

export default App;
