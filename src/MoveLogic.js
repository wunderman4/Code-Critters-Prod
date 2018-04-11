import * as C from './Constants.js';

export function rotate(input, us) {
	// input == usermove, us == UserState
	let newDirection = '';
	switch (us.direction) {
		case C.DIRECTION_NORTH:
			if (input === 'clockwise') {
				newDirection = C.DIRECTION_EAST;
			} else {
				newDirection = C.DIRECTION_WEST;
			}
			break;
		case C.DIRECTION_SOUTH:
			if (input === 'clockwise') {
				newDirection = C.DIRECTION_WEST;
			} else {
				newDirection = C.DIRECTION_EAST;
			}
			break;
		case C.DIRECTION_EAST:
			if (input === 'clockwise') {
				newDirection = C.DIRECTION_SOUTH;
			} else {
				newDirection = C.DIRECTION_NORTH;
			}
			break;
		case C.DIRECTION_WEST:
			if (input === 'clockwise') {
				newDirection = C.DIRECTION_NORTH;
			} else {
				newDirection = C.DIRECTION_SOUTH;
			}
			break;
		default:
			break;
	}
	return newDirection;
}

export function move(us, gb) {
	// input = usermove, us == userState, gb  == gameBoard
	let targetData = {
		Player: '',
		Direction: '',
		XPos: '',
		YPos: ''
	};

	// Gathering target position data.
	if (BoundsCheck(us, gb)) {
		switch (us.direction) {
			case C.DIRECTION_NORTH:
				// Gather properties of tile South of current position
				gb.forEach(tile => {
					if (tile.x === us.x && tile.y === us.y - 1) {
						targetData = targeting(targetData, tile);
					}
				});
				break;
			case C.DIRECTION_SOUTH:
				// Gather properties of tile North of current position
				gb.forEach(tile => {
					if (tile.x === us.x && tile.y === us.y + 1) {
						targetData = targeting(targetData, tile);
					}
				});
				break;
			case C.DIRECTION_EAST:
				//Gather properties of tile West of current position
				gb.forEach(tile => {
					if (tile.x === us.x + 1 && tile.y === us.y) {
						targetData = targeting(targetData, tile);
					}
				});
				break;
			case C.DIRECTION_WEST:
				// Gather properties of tile East of current position
				gb.forEach(tile => {
					if (tile.x === us.x - 1 && tile.y === us.y) {
						targetData = targeting(targetData, tile);
					}
				});
				break;
			default:
				break;
		}

		if (targetData.Direction === C.DIRECTION_NULL) {
			eatUm(us, gb, targetData);
		} else if (
			us.direction === C.DIRECTION_NORTH &&
			targetData.Direction !== C.DIRECTION_SOUTH
		) {
			eatUm(us, gb, targetData);
		} else if (
			us.direction === C.DIRECTION_SOUTH &&
			targetData.Direction !== C.DIRECTION_NORTH
		) {
			eatUm(us, gb, targetData);
		} else if (
			us.direction === C.DIRECTION_EAST &&
			targetData.Direction !== C.DIRECTION_WEST
		) {
			eatUm(us, gb, targetData);
		} else if (
			us.direction === C.DIRECTION_WEST &&
			targetData.Direction !== C.DIRECTION_EAST
		) {
			eatUm(us, gb, targetData);
		} else {
			// bounce
		}
	}
}
// ----------------------------------------------------------

// Checks the outer bounds of the game board
function BoundsCheck(us, gb) {
	const lastPos = gb[gb.length - 1];
	if (us.x === 0 && us.direction === C.DIRECTION_WEST) {
		return false;
	} else if (us.x === lastPos.x && us.direction === C.DIRECTION_EAST) {
		return false;
	} else if (us.y === 0 && us.direction === C.DIRECTION_NORTH) {
		return false;
	} else if (us.y === lastPos.y && us.direction === C.DIRECTION_SOUTH) {
		return false;
	} else {
		return true;
	}
}

function targeting(targetData, tile) {
	targetData.XPos = tile.x;
	targetData.YPos = tile.y;
	targetData.Direction = tile.direction;
	targetData.Player = tile.player;
	return targetData;
}

// eats the player
function eatUm(us, gb, targetData) {
	const tile = gb.find(tile => {
		return tile.x === targetData.XPos && tile.y === targetData.YPos;
	});
	tile.direction = us.direction;
	tile.player = C.PLAYER_USER;
	us.player = C.PLAYER_OPEN;
	us.direction = C.DIRECTION_NULL;
}
