import React from 'react'
import UserService from 'service/user-service.jsx'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil()
const _user = new UserService()
import './index.scss'
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/',
    }
  }
  componentWillMount() {
    document.title = '登录-HAPPY MMALL'
  }
  onInputChange(e) {
    let inputValue = e.target.value,
      inputName = e.target.name
    this.setState({
      [inputName]: inputValue,
    })
  }
  onSubmit(e) {
    let loginInfo = {
        username: this.state.username,
        password: this.state.password,
      },
      checkResult = _user.checkLoginInfo(loginInfo)
    if (checkResult.status) {
      _user
        .login({
          username: this.state.username,
          password: this.state.password,
        })
        .then((res) => {
          _mm.setStorage('userInfo', res)
          this.props.history.push(this.state.redirect)
        })
        .catch((errMsg) => {
          _mm.errorTips(errMsg)
        })
    } else {
      _mm.errorTips(checkResult.msg)
    }
  }
  onInputKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSubmit()
    }
  }
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录--MMMAL系统</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="请输入用户名"
                  onChange={(e) => this.onInputChange(e)}
                  onKeyUp={(e) => this.onInputKeyUp(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="请输入密码"
                  onChange={(e) => this.onInputChange(e)}
                  onKeyUp={(e) => this.onInputKeyUp(e)}
                />
              </div>

              <button
                className="btn btn-lg btn-block btn-primary"
                onClick={(e) => this.onSubmit(e)}
              >
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
