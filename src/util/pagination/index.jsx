import React from 'react'
import RcPagintation from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.min.css'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <RcPagintation
            {...this.props}
            hideOnSinglePage
            showQuickJumper
          ></RcPagintation>
        </div>
      </div>
    )
  }
}

export default Pagination
