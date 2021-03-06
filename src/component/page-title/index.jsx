import React from 'react'

class PageTitle extends React.Component {
  componentWillMount() {
    document.title = this.props.title + '-HAPPY MMALL'
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-header">{this.props.title}</h1>
          {/* 增加this.props.children让其具有容器式作用 */}
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default PageTitle
