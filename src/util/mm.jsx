class MUtil {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        success(res) {
          if (0 === res.status) {
            typeof resolve === 'function' && resolve(res.data, res.msg)
          } else if (10 === res.status) {
            // 没有登录，强制登录
            this.doLogin()
          } else {
            typeof reject === 'function' && reject(res.msg || res.data)
          }
        },
        error(err) {
          typeof reject === 'function' && reject(err.statusText)
        },
      })
    })
  }
  doLogin() {
    window.location.href =
      '/login?redirect=' + encodeURIComponent(window.location.pathname)
  }
  // 获取url参数
  getUrlParam(name) {
    // integrate url like : localhost:9000?redirect=/product/index&name=4
    // redirect=/product/index&name=4
    let queryString = window.location.search.split('?')[1] || ''
    // 以 空或者&开始 中间是输入的name后面是一个=号，第二组是不包含&的任何数据，第三组是&或者空结尾
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    // ["redirect=/product/index&", "", "/product/index", "&", index: 0, input: "redirect=/product/index&name=4", groups: undefined]
    let result = queryString.match(reg)
    return result ? decodeURIComponent(result[2]) : null
  }
  // 错误提示
  errorTips(errMsg) {
    alert(errMsg || '好像哪里不对了~')
  }
  // 本地存储
  setStorage(name, data) {
    let dataType = typeof data
    if (dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data))
    } else if (['number', 'string', 'boolean'].indexOf(dataType) > 0) {
      window.localStorage.setItem(name, data)
    } else {
      alert('该类型不能用于本地存储！')
    }
  }
  getStorage(name) {
    let data = window.localStorage.getItem(name)
    if (data) {
      return JSON.parse(data)
    } else {
      return ''
    }
  }
  removeStorage(name) {
    window.localStorage.removeItem(name)
  }
}

export default MUtil
