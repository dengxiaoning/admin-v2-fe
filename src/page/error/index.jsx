import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'

class Error extends React.Component {
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="出错啦！"></PageTitle>
        <div className="row">
          <div className="col-md-12">
            <span> 找不到路径，</span>
            <Link to="/">点我返回首页</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Error
