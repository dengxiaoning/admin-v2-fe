import React from 'react'
import { Link } from 'react-router-dom'
import UserService from 'service/user-service.jsx'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil()
const _user = new UserService()

class NavTop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: _mm.getStorage('userInfo').username || '',
    }
  }
  onLogOut() {
    _user.loginOut().then(
      (res) => {
        _mm.removeStorage('userInfo')
        // 通过render 过来的页面无法继承router使用history
        window.location.href = '/login'
      },
      (errMsg) => {
        _mm.errorTips(errMsg)
      },
    )
  }
  render() {
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <b>HAPP</b>MMALL
          </Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a
              className="dropdown-toggle"
              href="javascript:;"
              aria-expanded="false"
            >
              <i className="fa fa-user fa-fw"></i>
              {this.state.username ? (
                <span>欢迎，{this.state.username}</span>
              ) : (
                <span>欢迎你</span>
              )}

              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a
                  onClick={(e) => {
                    this.onLogOut(e)
                  }}
                >
                  <i className="fa fa-sign-out fa-fw"></i>
                  <span>退出登录</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default NavTop
