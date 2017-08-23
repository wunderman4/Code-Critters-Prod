import React from "react";
import PropTypes from "prop-types";
import { boardStyle } from "./util.js";

// This is the second try where I made it a stateless component. I get the classnames for player, direction,
//

const Tile = props => {
  const { height, width } = boardStyle();
  return (
    <div
      key={`${props.x}-${props.y}`}
      style={{ flex: `0 0 ${width}%`, height: `${height}vh` }}
      className="square"
    >
      <div className={`circle ${props.player} ${props.direction}`} />
    </div>
  );
};

Tile.PropTypes = {
  player: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default Tile;

// flex: 0 0 11.5%;
//   height: 9.58vh;
