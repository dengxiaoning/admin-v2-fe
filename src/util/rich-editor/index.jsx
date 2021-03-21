import React from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'
import './index.scss'

// 通用富文本编辑器，依赖jquery
class RichEditor extends React.Component {
  constructor(props) {
    super(props)

    this.textareaDom = null
    // 较早版本使用refs https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
    this.textareaDomRef = (element) => {
      this.textareaDom = element
    }
  }
  componentDidMount() {
    this.loadEditor()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDetail !== nextProps.defaultDetail) {
      this.simditor.setValue(nextProps.defaultDetail)
    }
  }
  // 初始换富文本编辑器
  loadEditor() {
    let element = this.textareaDom
    this.simditor = new Simditor({
      textarea: $(element),
      defaultValue: this.props.placeholder || '请输入',
      upload: {
        url: '/manage/product/richtext_img_upload.do',
        defaultImage: '',
        fileKey: 'upload_file',
      },
    })
    this.bindEditorEvent()
  }
  // 将jquery 事件代理到react
  bindEditorEvent() {
    this.simditor.on('valuechanged', (e) => {
      this.props.onValueChange(this.simditor.getValue())
    })
  }
  render() {
    return (
      <div className="rich-editor">
        <textarea ref={this.textareaDomRef}></textarea>
      </div>
    )
  }
}

export default RichEditor
