import React from 'react'
import ReactDom from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
} from 'react-router-dom'
import Layout from 'component/layout/index.jsx'
import Home from 'page/home/index.jsx'
import Login from 'page/login/index.jsx'
import UserList from 'page/user/index.jsx'
import ErrorPage from 'page/error/index.jsx'

class App extends React.Component {
  layoutRouter() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/product" component={Home}></Route>
          <Route path="/product-category" component={Home}></Route>
          <Route path="/user/index" component={UserList}></Route>
          <Redirect exact from="/user" to="/user/index"></Redirect>
          <Route component={ErrorPage}></Route>
        </Switch>
      </Layout>
    )
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" render={(props) => this.layoutRouter()}></Route>
        </Switch>
      </Router>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'))
