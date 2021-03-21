import MUtil from 'util/mm.jsx'
const _mm = new MUtil()

class Order {
  getOrderList(listParam) {
    let url = '',
      data = {}
    if (listParam.listType === 'list') {
      url = '/manage/order/list.do'
      data.pageNum = listParam.pageNum
    } else if (listParam.listType === 'search') {
      url = '/manage/order/search.do'
      data.pageNum = listParam.pageNum
      data.orderNo = listParam.orderNumber
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data,
    })
  }
  getOrderDetail(orderNo) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/detail.do',
      data: {
        orderNo: orderNo,
      },
    })
  }
  sendGoogs(orderNumber) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/send_goods.do',
      data: {
        orderNo: orderNo,
      },
    })
  }
}

export default Order
