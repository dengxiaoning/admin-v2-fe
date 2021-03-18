import React from 'react'
import ProductService from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'

const _mm = new MUtil()
const _product = new ProductService()

import './category-selector.scss'

class CategorySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstCagtegoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0,
    }
  }
  componentDidMount() {
    this.loadFirstCategory()
  }
  // 加载一级分类
  loadFirstCategory() {
    _product.getCategoryList().then(
      (res) => {
        this.setState({
          firstCagtegoryList: res,
        })
      },
      (errMsg) => {
        _mm.errTips(errMsg)
      },
    )
  }
  // 加载二级品类
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then(
      (res) => {
        this.setState({
          secondCategoryList: res,
        })
      },
      (errMsg) => {
        _mm.errTips(errMsg)
      },
    )
  }
  // 一级品类变化
  onFirstCategoryChange(e) {
    let newValue = e.target.value || 0
    this.setState(
      {
        firstCategoryId: newValue,
        secondCategoryId: 0,
        secondCategoryList: [],
      },
      () => {
        // 更新二级品类
        this.loadSecondCategory()
        this.onPropsCategoryChange()
      },
    )
  }
  // 选中二级品类
  onSecondCategoryChange(e) {
    let newValue = e.target.value || 0
    this.setState(
      {
        secondCategoryId: newValue,
      },
      () => {
        this.onPropsCategoryChange()
      },
    )
  }
  // 传给父组件参数
  onPropsCategoryChange() {
    // 判断参数props中是否有传入该函数
    let categoryChangable = typeof this.props.onCategoryChange === 'function'
    if (this.state.secondCategoryId) {
      categoryChangable &&
        this.props.onCategoryChange(
          this.state.secondCategoryId,
          this.state.firstCategoryId,
        )
    }
    // 如果只有一级品类
    else {
      categoryChangable &&
        this.props.onCategoryChange(this.state.firstCategoryId, 0)
    }
  }
  render() {
    return (
      <div className="col-md-10">
        <select
          className="form-control cate-select"
          onChange={(e) => this.onFirstCategoryChange(e)}
        >
          <option value="">请选择一级分类</option>
          {this.state.firstCagtegoryList.map((category, index) => (
            <option value={category.id} key={index}>
              {category.name}
            </option>
          ))}
        </select>
        {this.state.secondCategoryList.length > 0 ? (
          <select
            className="form-control cate-select"
            onChange={(e) => this.onSecondCategoryChange(e)}
          >
            <option value="">请选择二级分类</option>
            {this.state.secondCategoryList.map((category, index) => (
              <option value={category.id} key={index}>
                {category.name}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    )
  }
}

export default CategorySelector
