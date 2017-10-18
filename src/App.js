import React, { Component } from "react";
import "../css/App.css";
import GameBoard from "./GameBoard.js";
import { manualMode } from "./util.js";

class App extends Component {
  state = {
    toggle: false,
    beenClicked: false
  };

  resetBeenClicked = () => this.setState({ beenClicked: false });

  render() {
    return (
      <div className="App">
        <div className="banner">
          <h1 className="title">CODE CRITTERS</h1>
        </div>
        <GameBoard
          autoPlay={this.state.toggle}
          beenClicked={this.state.beenClicked}
          resetBeenClicked={this.resetBeenClicked}
        />
        <div>
          <button className="ConBtn">Step</button>
          <label className="switch">
            <input
              checked={this.state.toggle}
              onChange={() => {
                this.setState({ toggle: !this.state.toggle });
              }}
              type="checkbox"
            />
            <span className="slider round" />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
