import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import ProductService from 'service/product-service.jsx'
import CategorySelector from 'page/product/index/category-selector.jsx'
import MUtil from 'util/mm.jsx'
import FileUploader from 'util/file-upload/index.jsx'
import RichEditor from 'util/rich-editor/index.jsx'

import './save.scss'
const _mm = new MUtil()
const _product = new ProductService()

class ProductSave extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
  // 简单的字段改变，比如商品名称，描述，价格，库存
  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value.trim()
    this.setState({
      [name]: value,
    })
  }
  // 品类选择器变化
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId: categoryId,
      parentCategoryId: parentCategoryId,
    })
  }
  // 上传成功
  onUploadSuccess(res) {
    let subimages = this.state.subImages
    subimages.push(res)
    this.setState({
      subImages: subimages,
    })
  }
  // 上传异常
  onUploadError(errMsg) {
    _mm.errorTips(errMsg)
  }
  // 删除图片
  onImageDelete(e) {
    // 此处不可以使用e.target.index，因为index 不存在i的原型上（是我们自定义的属性）
    let index = parseInt(e.target.getAttribute('index')),
      subImages = this.state.subImages
    subImages.splice(index, 1)
    this.setState({
      subImages: subImages,
    })
  }
  // 富文本数据更改后回传函数
  onDetailValueChange(value) {
    this.setState({
      detail: value,
    })
  }
  getSubImagesString() {
    return this.state.subImages.map((image) => image.uri).join(',')
  }
  // 提交表单
  onSubmit() {
    let product = {
        name: this.state.name,
        subtitle: this.state.subtitle,
        categoryId: parseInt(this.state.categoryId),
        subImages: this.getSubImagesString(),
        detail: this.state.detail,
        price: parseFloat(this.state.price),
        stock: parseInt(this.state.stock),
        status: this.state.status,
      },
      productCheckResult = _product.checkProduct(product)
    // 表单验证成功
    if (productCheckResult.status) {
      _product.saveProduct(product).then(
        (res) => {
          _mm.successTips(res)
          this.props.history.push('/product/index')
        },
        (errMsg) => {
          _mm.errorTips(errMsg)
        },
      )
    } else {
      _mm.errorTips(productCheckResult.msg)
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
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="请输入商品名称"
                onChange={(e) => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input
                type="text"
                name="subtitle"
                className="form-control"
                placeholder="请输入商品描述"
                onChange={(e) => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector
              onCategoryChange={(categoryId, parentCategoryId) =>
                this.onCategoryChange(categoryId, parentCategoryId)
              }
            />
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-5">
              <div className="input-group">
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="请输入商品价格"
                  onChange={(e) => this.onValueChange(e)}
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
                  type="number"
                  name="stock"
                  className="form-control"
                  placeholder="请输入商品库存"
                  onChange={(e) => this.onValueChange(e)}
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
                    <i
                      className="fa fa-close"
                      index={index}
                      onClick={(e) => this.onImageDelete(e)}
                    ></i>
                  </div>
                ))
              ) : (
                <div>请上传图片</div>
              )}
            </div>
            <div className="col-md-offset-2 col-md-10 file-upload-con">
              <FileUploader
                onSuccess={(res) => this.onUploadSuccess(res)}
                onError={(errMsg) => this.onUploadError(errMsg)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <RichEditor
                onValueChange={(value) => this.onDetailValueChange(value)}
              ></RichEditor>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => this.onSubmit(e)}
              >
                提交
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductSave
