import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import ProductService from 'service/product-service.jsx'
import CategorySelector from 'page/product/index/category-selector.jsx'
import MUtil from 'util/mm.jsx'

import './save.scss'
const _mm = new MUtil()
const _product = new ProductService()

class ProductDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.pid,
      name: '',
      subtitle: '',
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      price: '',
      stock: '',
      detail: '',
      status: 1, // 这是商品状态（在售）
    }
  }
  componentDidMount() {
    this.loadProduct()
  }
  // 加载商品详情数据
  loadProduct() {
    // 在有id时表示是编辑，需要数据回填
    if (this.state.id) {
      _product.getProduct(this.state.id).then(
        (res) => {
          let images = res.subImages.split(',')
          res.subImages = images.map((imgUri) => {
            return {
              uri: imgUri,
              url: res.imageHost + imgUri,
            }
          })
          this.setState(res)
        },
        (errMsg) => {
          _mm.errorTips(errMsg)
        },
      )
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="添加商品" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <p className="from-contol-static">{this.state.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <p className="from-contol-static">{this.state.subtitle}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector
              readOnly={true}
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
            />
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-5">
              <div className="input-group">
                <input
                  readOnly
                  type="number"
                  className="form-control"
                  value={this.state.price}
                />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-5">
              <div className="input-group">
                <input
                  readOnly
                  type="number"
                  value={this.state.stock}
                  className="form-control"
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              {this.state.subImages.length > 0 ? (
                this.state.subImages.map((image, index) => (
                  <div className="img-con" key={index}>
                    <img className="img" src={image.url} />
                  </div>
                ))
              ) : (
                <div>暂无图片</div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div
              className="col-md-10"
              dangerouslySetInnerHTML={{ __html: this.state.detail }}
            ></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetail
