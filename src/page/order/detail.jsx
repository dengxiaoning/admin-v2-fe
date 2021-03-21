import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import Order from 'service/order-service.jsx'
import TableList from 'util/table-list/index.jsx'

import MUtil from 'util/mm.jsx'

import './detail.scss'

const _mm = new MUtil()
const _order = new Order()

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderNumber: this.props.match.params.orderNumber,
      orderInfo: {},
    }
  }
  componentDidMount() {
    this.loadOrderDetail()
  }
  // 加载商品详情数据
  loadOrderDetail() {
    // 在有id时表示是编辑，需要数据回填
    if (this.state.orderNumber) {
      _order.getOrderDetail(this.state.orderNumber).then(
        (res) => {
          this.setState({
            orderInfo: res,
          })
        },
        (errMsg) => {
          _mm.errorTips(errMsg)
        },
      )
    }
  }
  onSendGoods() {
    if (window.confirm('是否确认该订单已经发货？')) {
      _order.sendGoogs(this.state.orderNumber).then(
        (res) => {
          _mm.successTips(res)
          this.loadOrderDetail()
        },
        (errMsg) => {
          _mm.errorTips(errMsg)
        },
      )
    }
  }
  render() {
    let receiveInfo = this.state.orderInfo.shippingVo || {},
      productList = this.state.orderInfo.orderItemVoList || [],
      tableHeads = [
        { name: '商品图片', width: '10%' },
        { name: '商品信息', width: '45%' },
        { name: '单价', width: '15%' },
        { name: '数量', width: '15%' },
        { name: '合计', width: '15%' },
      ]
    return (
      <div id="page-wrapper">
        <PageTitle title="订单详情" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">订单号</label>
            <div className="col-md-5">
              <p className="from-contol-static">
                {this.state.orderInfo.orderNo}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">创建时间</label>
            <div className="col-md-5">
              <p className="from-contol-static">
                {this.state.orderInfo.createTime}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">收件人</label>
            <div className="col-md-5">
              <p className="from-contol-static">
                {receiveInfo.receiverName}，{receiveInfo.receiverProvince}
                {receiveInfo.receiverCity}
                {receiveInfo.receiverAddress}
                {receiveInfo.receiverMobile || receiveInfo.receivePhone}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单状态</label>
            <div className="col-md-5">
              <p className="from-contol-static">
                {this.state.orderInfo.statusDesc}
                {this.state.orderInfo.status === 20 ? (
                  <button
                    className="btn btn-default btn-sm btn-send-goods"
                    onClick={(e) => this.onSendGoods(e)}
                  >
                    立即发货
                  </button>
                ) : null}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">支付方式</label>
            <div className="col-md-5">
              <p className="from-contol-static">
                {this.state.orderInfo.paymentTypeDesc}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单金额</label>
            <div className="col-md-5">
              <p className="from-contol-static">
                ￥{this.state.orderInfo.payment}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品列表</label>
            <div className="col-md-5">
              <TableList tableHeads={tableHeads}>
                {productList.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          className="p-img"
                          src={`${this.state.orderInfo.imageHost}${product.productImage}`}
                          alt={product.productName}
                        />
                      </td>
                      <td>{product.productName}</td>
                      <td>￥{product.currentUnitPrice}</td>
                      <td>{product.quantity}</td>
                      <td>￥{product.totalPrice}</td>
                    </tr>
                  )
                })}
              </TableList>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderDetail
