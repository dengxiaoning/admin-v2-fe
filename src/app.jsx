import React from 'react'
import ReactDom from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
} from 'react-router-dom'
import Layout from 'component/layout/index.jsx'
import Home from 'page/home/index.jsx'
class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Redirect from="*" to="/"></Redirect>
          </Switch>
        </Layout>
      </Router>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'))
