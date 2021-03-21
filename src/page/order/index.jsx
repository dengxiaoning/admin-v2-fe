/**
 * @Author:Dex
 * @Date 2021-03-21 20:59
 * @Last Modified by : Dex
 * @Last Modified time: 2021-03-21 21:00
 */
import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import Order from 'service/order-service.jsx'
import ListSearch from './index-list-search.jsx'
import MUtil from 'util/mm.jsx'
import TableList from 'util/table-list/index.jsx'

const _mm = new MUtil()
const _order = new Order()

class OrderList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list', // list or search
    }
  }
  componentDidMount() {
    this.loadOrderList()
  }
  loadOrderList() {
    let listParam = {
      listType: this.state.listType,
      pageNum: this.state.pageNum,
    }
    // 如果为搜索，需要其他搜索参数
    if (this.state.listType === 'search') {
      listParam.orderNumber = this.state.orderNumber
    }
    _order.getOrderList(listParam).then(
      (res) => {
        this.setState(res)
      },
      (errMsg) => {
        this.setState({
          list: [],
        })
        _mm.errorTips(errMsg)
      },
    )
  }
  onSearch(orderNumber) {
    let listType = orderNumber === '' ? 'list' : 'search'
    this.setState(
      {
        listType: listType,
        pageNum: 1,
        orderNumber: orderNumber,
      },
      () => {
        this.loadOrderList()
      },
    )
  }
  // 页数变化
  onPageNumChange(pageNum) {
    this.setState(
      {
        pageNum: pageNum,
      },
      () => {
        this.loadOrderList()
      },
    )
  }

  render() {
    let tableHeads = [
      '订单号',
      '收件人',
      '订单状态',
      '订单总价',
      '创建时间',
      '操作',
    ]
    return (
      <div id="page-wrapper">
        <PageTitle title="订单列表" />
        <ListSearch onSearch={(orderNumber) => this.onSearch(orderNumber)} />

        <TableList tableHeads={tableHeads}>
          {this.state.list.map((order, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link to={`/order/detail/${order.orderNo}`}>
                    {order.orderNo}
                  </Link>
                </td>
                <td>{order.receiverName}</td>
                <td>{order.statusDesc}</td>
                <td>￥{order.payment}</td>
                <td>{order.createTime}</td>
                <td>
                  <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
                </td>
              </tr>
            )
          })}
        </TableList>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={(pageNum) => this.onPageNumChange(pageNum)}
        ></Pagination>
      </div>
    )
  }
}

export default OrderList
