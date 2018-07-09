import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Box(props) {
  return (
    <button
      className="box"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

function WinnerSelection(boxes) {
  const boxLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < boxLines.length; i++) {
    const [a, b, c] = boxLines[i]
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      return boxes[a]
    }
  }

  return null
}

class BoxContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      boxes: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i) {
    const boxes = this.state.boxes.slice()
    if(WinnerSelection(boxes) || boxes[i]) {
      return
    }
    boxes[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      boxes: boxes,
      xIsNext: !this.state.xIsNext,
    })
  }

  renderBox(i) {
    return <Box
            value={this.state.boxes[i]}
            onClick={() => this.handleClick(i)}
           />
  }

  render() {
    const winner = WinnerSelection(this.state.boxes)
    let status

    if (winner) {
      status = 'Winner ' + winner
    } else {
      status = 'Next Player ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game-board">
        <div className="status">{status}</div>

        <div className="board-row">
          {this.renderBox(0)}
          {this.renderBox(1)}
          {this.renderBox(2)}
        </div>

        <div className="board-row">
          {this.renderBox(3)}
          {this.renderBox(4)}
          {this.renderBox(5)}
        </div>

        <div className="board-row">
          {this.renderBox(6)}
          {this.renderBox(7)}
          {this.renderBox(8)}
        </div>
      </div>
    );
  }
}

class TicTacToe extends React.Component {
  render() {
    return (
      <div className="game">
        <BoxContainer />

        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <TicTacToe />,
  document.getElementById('root')
);
