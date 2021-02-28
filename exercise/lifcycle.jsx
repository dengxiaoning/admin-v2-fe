import React from 'react'
import ReactDOM from 'react-dom'

class Children1 extends React.Component {
  constructor(props) {
    super(props)
  }
  handleClick() {
    this.props.onChangeBgclorChild2('red')
  }
  onValueChange(e) {
    this.setState({
      age: e.target.value,
    })
  }
  render() {
    return (
      <div>
        <h1>Children1背景： {this.props.bgColor}</h1>
        <button onClick={(e) => this.handleClick(e)}>改变childre2背景</button>
      </div>
    )
  }
}
class Children2 extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{ background: this.props.bgColor }}>
        <h1>Children2背景： {this.props.bgColor}</h1>
      </div>
    )
  }
}
class Father extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bgColor: '#999',
    }
  }
  onChangeBgclorChild2(color) {
    this.setState({
      bgColor: color,
    })
  }
  render() {
    return (
      <div>
        <Children1
          onChangeBgclorChild2={(color) => {
            this.onChangeBgclorChild2(color)
          }}
        />
        <Children2 bgColor={this.state.bgColor} />
      </div>
    )
  }
}

class TestLifcire extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: 'old data',
    }
    console.log('constructor')
  }

  componentWillMount() {
    console.log('componentWillMount')
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }
  componentWillReceiveProps(props) {
    console.log('componentWillReceiveProps', props)
  }
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  changecommponet() {
    console.log('改变component..')
    this.setState({
      data: 'oooo',
    })
  }
  render() {
    console.log('render.')
    return (
      <div>
        <h1>哈哈哈</h1>
        <button
          onClick={(e) => {
            this.changecommponet(e)
          }}
        >
          改变组件
        </button>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dis: 'ooo',
      haschildren: true,
    }
  }
  changeprop() {
    console.log('改变prop')
    this.setState({
      dis: 'hhahh',
    })
  }
  distorycomm() {
    console.log('销毁组件')
    this.setState({
      haschildren: false,
    })
  }
  render() {
    return (
      <div>
        {this.state.haschildren ? <TestLifcire dis={this.state.dis} /> : null}

        <button
          onClick={(e) => {
            this.changeprop(e)
          }}
        >
          改变prop
        </button>
        <button
          onClick={(e) => {
            this.distorycomm(e)
          }}
        >
          销毁组件
        </button>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'))
