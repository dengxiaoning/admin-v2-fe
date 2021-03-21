import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import ProductService from 'service/product-service.jsx'
import Pagination from 'util/pagination/index.jsx'
import TableList from 'util/table-list/index.jsx'
import MUtil from 'util/mm.jsx'

const _mm = new MUtil()
const _product = new ProductService()

class CategoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.categoryId || 0,
    }
  }
  componentDidMount() {
    this.loadCategoryList()
  }

  // 组件更新钩子
  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname,
      newPath = this.props.location.pathname,
      newId = this.props.match.params.categoryId || 0
    if (oldPath !== newPath) {
      this.setState(
        {
          parentCategoryId: newId,
        },
        () => {
          this.loadCategoryList()
        },
      )
    }
  }
  // 加载品类列表
  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(
      (res) => {
        this.setState({
          list: res,
        })
      },
      (errMsg) => {
        this.setState({
          list: [],
        })
        _mm.errorTips(errMsg)
      },
    )
  }
  // 更新品类名称
  onUpdateName(e, categoryId, categoryName) {
    let newName = window.prompt('请输入新的品类名', categoryName)
    if (newName) {
      _product
        .updateCategoryName({
          categoryName: newName,
          categoryId: categoryId,
        })
        .then(
          (res) => {
            _mm.successTips(res)
            this.loadCategoryList()
          },
          (errMsg) => {
            _mm.errorTips(errMsg)
          },
        )
    }
  }
  render() {
    let listBody = this.state.list.map((category, index) => {
      return (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>
            <a
              onClick={(e) => this.onUpdateName(e, category.id, category.name)}
              className="opear"
            >
              修改名称
            </a>
            {category.parentId === 0 ? (
              <Link to={`/product-category/index/${category.id}`}>
                查看子品类
              </Link>
            ) : null}
          </td>
        </tr>
      )
    })
    return (
      <div id="page-wrapper">
        <PageTitle title="品类列表">
          <div className="page-header-right">
            <Link className="btn btn-primary" to="/product-category/add">
              <i className="fa fa-plus"></i>
              <span>添加品类</span>
            </Link>
          </div>
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <p>父品类Id{this.state.parentCategoryId}</p>
          </div>
        </div>
        <TableList tableHeads={['品类ID', '品类名', '操作']}>
          {listBody}
        </TableList>
      </div>
    )
  }
}

export default CategoryList
