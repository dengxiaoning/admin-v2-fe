import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import ProductService from 'service/product-service.jsx'
import ListSearch from './index-list-search.jsx'
import MUtil from 'util/mm.jsx'
import TableList from 'util/table-list/index.jsx'
import './index.scss'

const _mm = new MUtil()
const _product = new ProductService()

class PeoductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list',
    }
  }
  componentDidMount() {
    this.loadProductList()
  }
  loadProductList() {
    let listParam = {
      listType: this.state.listType,
      pageNum: this.state.pageNum,
    }
    // 如果为搜索，需要其他搜索参数
    if (this.state.listType === 'search') {
      listParam.searchType = this.state.searchType
      listParam.keyword = this.state.searchKeyword
    }
    _product.getProductList(listParam).then(
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
  onSearch(searchType, searchKeyword) {
    let listType = searchKeyword === '' ? 'list' : 'search'
    this.setState(
      {
        listType: listType,
        pageNum: 1,
        searchType: searchType,
        searchKeyword: searchKeyword,
      },
      () => {
        this.loadProductList()
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
        this.loadProductList()
      },
    )
  }
  // 改变商品状态
  onSetProductStatus(event, productId, currStatus) {
    let newStatus = currStatus == 1 ? 2 : 1,
      confirmTips = currStatus == 1 ? '确定下架该商品？' : '确定下架该商品?'
    if (window.confirm(confirmTips)) {
      _product
        .setProductStatus({ productId: productId, status: newStatus })
        .then(
          (res) => {
            _mm.successTips(res)
            this.loadProductList()
          },
          (errMsg) => {
            _mm.errorTips(errMsg)
          },
        )
    }
  }
  render() {
    let tableHeads = [
      { name: '商品ID', width: '10%' },
      { name: '商品信息', width: '50%' },
      { name: '价格', width: '10%' },
      { name: '状态', width: '15%' },
      { name: '操作', width: '15%' },
    ]
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表">
          <div className="page-header-right">
            <Link className="btn btn-primary" to="/product/save">
              <i className="fa fa-plus"></i>
              <span>添加商品</span>
            </Link>
          </div>
        </PageTitle>
        <ListSearch
          onSearch={(searchType, searchKeyword) =>
            this.onSearch(searchType, searchKeyword)
          }
        />

        <TableList tableHeads={tableHeads}>
          {this.state.list.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.id}</td>
                <td>
                  <p>{product.name}</p>
                  <p>{product.subtitle}</p>
                </td>
                <td>￥{product.price}</td>
                <td>
                  <p>{product.status == 1 ? '在售' : '已下架'}</p>
                  <button
                    className="btn btn-warning btn-xs"
                    onClick={(e) =>
                      this.onSetProductStatus(e, product.id, product.status)
                    }
                  >
                    {product.status == 1 ? '下架' : '上架'}
                  </button>
                </td>
                <td>
                  <Link className="opear" to={`/product/detail/${product.id}`}>
                    详情
                  </Link>
                  <Link className="opear" to={`/product/save/${product.id}`}>
                    编辑
                  </Link>
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

export default PeoductList
