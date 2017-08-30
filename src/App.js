import React, { Component } from "react";
import "../css/App.css";
import GameBoard from "./GameBoard.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="banner">
          <h1 className="title">CODE CRITTERS</h1>
        </div>
        <GameBoard />
        <div>
          <button className="button">CONNECT</button>
        </div>
      </div>
    );
  }
}

export default App;
