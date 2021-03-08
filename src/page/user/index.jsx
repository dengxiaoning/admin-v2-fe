import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'

class UserList extends React.Component {
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表"></PageTitle>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-border">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Id</th>
                  <th>Id</th>
                  <th>Id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>oo</td>
                  <td>oo</td>
                  <td>oo</td>
                  <td>oo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default UserList
