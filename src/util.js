import * as C from "./Constants.js";

function timeControl(userMove) {
  const um = userMove;
}

//////////////////////////Board Generator Below//////////////////////////////////

// Sets the size and scale of the gameboard
export function boardStyle() {
  const width = 100 / C.SIZE - 1;
  return {
    width,
    height: width * C.SCALE
  };
}

// used in getEnemies & getBoard functions to generate random positions
// for the enemies and the player.
function generatePos() {
  return Math.floor(Math.random() * C.SIZE);
}

// generates set number of enemies in different positions
function getEnemies() {
  const enemies = [];
  for (let i = 0; i < C.ENEMY_COUNT; i++) {
    if (enemies.length === C.ENEMY_COUNT) return enemies;
    const enemyX = generatePos();
    const enemyY = generatePos();

    if (!enemies.some(enemy => enemy.x === enemyX && enemy.y === enemyY)) {
      enemies.push({
        x: enemyX,
        y: enemyY
      });
    } else {
      i--;
    }
  }

  return enemies;
}

// takes the enemies and the player and places them on the correct tiles
// within the board, then returns the complete board.
export function getBoard() {
  const board = [];

  const playerX = generatePos(); //Math.floor(Math.random() * C.SIZE);
  const playerY = generatePos(); //Math.floor(Math.random() * C.SIZE);
  const playerDirection = Math.floor(Math.random() * 4);
  const enemies = getEnemies();
  const directions = [
    C.DIRECTION_NORTH,
    C.DIRECTION_EAST,
    C.DIRECTION_SOUTH,
    C.DIRECTION_WEST
  ];

  for (let i = 0; i < C.SIZE; i++) {
    for (let j = 0; j < C.SIZE; j++) {
      const tile = {
        x: j,
        y: i
      };

      if (playerX === j && playerY === i) {
        tile.player = C.PLAYER_USER;
      } else if (enemies.some(enemy => enemy.x === j && enemy.y === i)) {
        tile.player = C.PLAYER_ENEMY;
        tile.direction = directions[Math.floor(Math.random() * 4)];

        // find if x & y matches any enemy in enemies array,
        // if it does also set the direction
      } else {
        tile.player = C.PLAYER_OPEN;
      }

      if (tile.player === C.PLAYER_USER) {
        tile.direction = directions[playerDirection];
      }
      board.push(tile);
    }
  }
  return board;
}
