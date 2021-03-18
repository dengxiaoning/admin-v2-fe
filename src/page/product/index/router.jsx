import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'

class ProductRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList}></Route>
        <Route path="/product/save" component={ProductSave}></Route>
        <Redirect exact from="/product" to="/product/index"></Redirect>
      </Switch>
    )
  }
}

export default ProductRouter
