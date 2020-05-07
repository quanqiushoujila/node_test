import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
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
  onFinish: () => {

  }

  render () {
    return (
      <div>
        <Form
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
            name="author"
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