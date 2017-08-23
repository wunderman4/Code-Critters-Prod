// Used for Tiles State and Tile Props
// Direction
export const DIRECTION_CLOCKWISE = "clockwise";
export const DIRECTION_COUNTERCLOCKWISE = "counterClockwise";
export const DIRECTION_NORTH = "north";
export const DIRECTION_SOUTH = "south";
export const DIRECTION_EAST = "east";
export const DIRECTION_WEST = "west";
export const DIRECTION_NULL = null;
//Player
export const PLAYER_ENEMY = "enemy";
export const PLAYER_USER = "user";
export const PLAYER_OPEN = "";
export const MOVE_MAKE = "move";

export const MOVE_VALID = "valid"; // valid forward move to unoccupied tile.
export const MOVE_INVALID = "invalid"; // invalid move to either off gird or head to head with enemy.
export const MOVE_ATTACK = "attack"; // valid forward move to occupied tile.

export const SCALE = 0.833333;
export const SIZE = 8;
