import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Box(props) {
  return (
    <button
      className='box'
      onClick={props.onClick}
    >
      {console.log('props.value', props)}
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
      return (
        boxes[a]
      )
    }
  }

  return null
}

class BoxContainer extends React.Component {
  renderBox(i) {
    return <Box
            value={this.props.boxes[i]}
            onClick={() => this.props.onClick(i)}
           />
  }

  render() {
    let boxesArray = this.props.boxes
    let self = this

    return (
      <div className="game-board">
        { boxesArray.map(function(value, i){
          return <span key={i}>{self.renderBox(i)}</span>
        })}
      </div>
    );
  }
}

class TicTacToe extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      history: [{
        boxes: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      boldIt: false,
      clickIndex: -1,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const boxes = current.boxes.slice()

    if(WinnerSelection(boxes) || boxes[i]) {
      return
    }

    boxes[i] = this.state.xIsNext ? 'X' : 'O'

    this.setState({
      history: history.concat([{
        boxes: boxes,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      boldIt: true,
      clickIndex: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = WinnerSelection(current.boxes)
    let self = this

    const moves = history.map((step, move) => {
      const desc = move ?
      'Go to move # ' + move :
      'Go to game start'

      return (
        <li key={move}>
          <button className={(self.state.boldIt && move === self.state.clickIndex) ? 'bold' : ''} onClick = {() => this.jumpTo(move)}>{desc} </button>
        </li>
      )
    })

    let status

    if (winner) {
      status = 'Winner ' + winner
    } else {
      status = 'Next Player ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game">
        <BoxContainer
          boxes = {current.boxes}
          onClick = {(i) => this.handleClick(i)}
        />

        <div className="game-info">
          <div>{status}</div>

          <button type="button">Sort it</button>

          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <TicTacToe />,
  document.getElementById('root')
);
