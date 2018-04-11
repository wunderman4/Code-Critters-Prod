import React, { Component } from 'react';
import * as C from './Constants.js';
import Tile from './Tile.js';
import { rotate, move } from './MoveLogic.js';
import { getBoard } from './util';
import io from 'socket.io-client';

var socket;

class GameBoard extends Component {
	state = {
		tiles: getBoard()
	};

	// togleStep = await () => {
	//   return !this.state.singleStep;
	// };

	timeControl() {}

	// userChoice is where we send user move.
	userChoice = e => {
		// if (!timeControl(e, this.props.beenClicked, this.props.autoPlay)) {
		//   // await button click to move a piece
		//   return;
		// }

		//console.log(e);
		const userState =
			this.state.tiles.find(tile => tile.player === C.PLAYER_USER) || {};

		var direction = userState.direction; // used to set new direction of user.

		switch (e) {
			case C.DIRECTION_CLOCKWISE:
				direction = rotate(C.DIRECTION_CLOCKWISE, userState);
				break;
			case C.MOVE_MAKE:
				move(userState, this.state.tiles);
				break;
			case C.DIRECTION_COUNTERCLOCKWISE:
				direction = rotate(C.DIRECTION_COUNTERCLOCKWISE, userState);
				break;
			default:
				direction = userState.direction;
				break;
		}

		// Uncomment to enable player move by key press.
		// switch (e.key) {
		// 	case 'ArrowRight':
		// 		//socket.emit('response', { GameBoard: this.state.tiles });
		// 		direction = rotate(C.DIRECTION_CLOCKWISE, userState);
		// 		break;
		// 	case 'ArrowUp':
		// 		move(userState, this.state.tiles);
		// 		break;
		// 	case 'ArrowLeft':
		// 		direction = rotate(C.DIRECTION_COUNTERCLOCKWISE, userState);
		// 		break;
		// 	default:
		// 		direction = userState.direction;
		// 		break;
		// }

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
				setTimeout(() => {
					socket.emit('response', { GameBoard: this.state.tiles });
				}, 1000);
			}
		);
	};

	componentDidMount() {
		// Open socket.io connection here
		window.gameBoard = this.state.tiles;
		window.addEventListener('keydown', this.userChoice);
		// socket.io
		socket = io('http://localhost:9090');
		socket.on('move', this.userChoice);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.autoPlay && nextProps.autoPlay) {
			timeControl();
		}

		if (this.props.autoPlay && !nextProps.autoPlay) {
			// stopTimeControl();
		}
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
