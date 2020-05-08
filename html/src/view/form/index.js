import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import { createPage, updatePage, getDetail } from '@/api/list'
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
}
class KForm extends Component {
  formRef = React.createRef()
  constructor (props) {
    super(props)
    this.state = {
      state: 'create',
      id: '',
      form: {
        title: '11',
        content: '22',
        author: '33'
      }
    }
  }
  onFinish = (values) => {
    if (this.state.id) {
      values.id = this.state.id
      updatePage(values).then(({data}) => {
        if (data.code === 0) {
          message.success('创建成功')
          this.formRef.current.resetFields()
        }
      })
    } else  {
      createPage(values).then(({data}) => {
        if (data.code === 0) {
          message.success('更新成功')
          this.formRef.current.resetFields()
        }
      })
    }
  }
  componentDidMount () {
    const result = this.getSearchParams(this.props.location.search)
    this.setState(() => {
      return {
        state: result ? 'update' : 'create',
        id: result ? result.id : ''
      }
    }, () => {
      if (this.state.id) {
        getDetail({id: this.state.id}).then(({ data }) => {
          this.formRef.current.setFieldsValue(data.data)
        })
      }
    })
  }
  getSearchParams = (search) => {
    const params = search.split('?')[1]
    if (params) {
      let obj = {}
      const arr = params.split('&')
      arr.forEach((item) => {
        let result = item.split('=')
        obj[result[0]] = result[1]
      })
      return obj
    }
    return null
  }

  render () {
    return (
      <div>
        <Form
          ref={this.formRef}
          {...layout}
          name="basic"
          onFinish={this.onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="作者"
            name="author"
            rules={[
              {
                required: true,
                message: '请输入作者',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[
              {
                required: true,
                message: '请输入内容',
              },
            ]}
          >
            <Input.TextArea  />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default KForm