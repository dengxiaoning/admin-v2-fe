import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

class ACom extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>Component A</div>
  }
}

class BCom extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        Component B
        <Switch>
          <Route
            exact
            path={`${this.props.match.path}`}
            render={(route) => {
              return <div>当前是不带参数是的组件B</div>
            }}
          ></Route>
          <Route
            path={`${this.props.match.path}/sub`}
            render={(route) => {
              return <div>当前是sub</div>
            }}
          ></Route>
          <Route
            path={`${this.props.match.path}/:id`}
            render={(route) => {
              return <div>当前是带参数是：{route.match.params.id}</div>
            }}
          ></Route>
        </Switch>
      </div>
    )
  }
}

class Warpper extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Link to="/ad">组件a</Link>
        <br></br>
        <Link to="/ba/123">代餐bb</Link>
        <br />
        <Link to="/ba/sub">/ba/sub</Link>
        <br />
        <Link to="/ba">组件b</Link>
        <hr></hr>
        {this.props.children}
      </div>
    )
  }
}
ReactDom.render(
  <Router>
    <Warpper>
      <Route path="/ad" component={ACom}></Route>
      <Route path="/ba" component={BCom}></Route>
    </Warpper>
  </Router>,
  document.getElementById('app'),
)
