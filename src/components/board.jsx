import React, { Component } from "react";
import Square from "./square";

export const PLAYER_ONE = "X";
export const PLAYER_TWO = "O";

class Board extends Component {
  renderSquare(i) {
    const { onClick, squares } = this.props;
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          onClick(i);
        }}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
