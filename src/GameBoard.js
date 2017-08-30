import React, { Component } from "react";
import * as C from "./Constants.js";
import Tile from "./Tile.js";
import { rotate, move } from "./MoveLogic.js";
import { getBoard } from "./util";

class GameBoard extends Component {
  state = {
    tiles: getBoard()
  };

  returnState() {
    console.log(this.state.tiles);
    return this.state.tiles;
  }

  // Entry point for user moves, currently set to test movement of Player.
  //this needs to be the handler for events from socket.io
  userChoice = e => {
    const userState =
      this.state.tiles.find(tile => tile.player === C.PLAYER_USER) || {};

    var direction = userState.direction; // used to set new direction of user.

    switch (e.key) {
      case "ArrowRight":
        direction = rotate(C.DIRECTION_CLOCKWISE, userState);
        break;
      case "ArrowUp":
        move(userState, this.state.tiles);
        break;
      case "ArrowLeft":
        direction = rotate(C.DIRECTION_COUNTERCLOCKWISE, userState);
        break;
      default:
        direction = userState.direction;
        break;
    }
    const newBoard = this.state.tiles.map(
      tile =>
        tile.player === C.PLAYER_USER ? { ...tile, direction: direction } : tile
    );
    this.setState(
      {
        tiles: newBoard
      },
      () => {
        // socket.send needs to go here to send updated gameboard
        window.gameBoard = this.state.tiles;
      }
    );
  };

  componentDidMount() {
    // Open socket.io connection here
    window.gameBoard = this.state.tiles;
    window.addEventListener("keydown", this.userChoice);
  }
  render() {
    return (
      <div className="board">
        {this.state.tiles.map(t => (
          <Tile
            key={`${t.x}-${t.y}`}
            player={t.player}
            direction={t.direction}
            x={t.x}
            y={t.y}
            //size={}
          />
        ))}
      </div>
    );
  }
}

export default GameBoard;
