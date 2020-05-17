import React, { Component } from "react";
import Board, { PLAYER_ONE, PLAYER_TWO } from "./board";
import checkifWinner from "./checkIfWinner";

const NUM_SQUARES = 9;

class Game extends Component {
  state = {
    history: [
      {
        squares: Array(NUM_SQUARES).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  };

  handleClick(index) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (!(squares[index] === null)) {
      alert("That square is full! Try another");
      return;
    } else if (checkifWinner(squares)) {
      return;
    }
    squares[index] = this.state.xIsNext ? PLAYER_ONE : PLAYER_TWO;
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const currentPlayer = this.state.xIsNext ? PLAYER_ONE : PLAYER_TWO;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = checkifWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <ul key={move}>
          <button
            className="btn btn-primary btn-sm m-1"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </ul>
      );
    });

    let status;
    if (winner) {
      const message = winner + " won!";
      alert(message);
      status = message;
    } else {
      status = "Next player: " + currentPlayer;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
