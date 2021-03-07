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
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route
            path="/"
            render={(props) => (
              <Layout>
                <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/product" component={Home}></Route>
                  <Route
                    exact
                    path="/product-category"
                    component={Home}
                  ></Route>
                </Switch>
              </Layout>
            )}
          ></Route>
        </Switch>
      </Router>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'))
