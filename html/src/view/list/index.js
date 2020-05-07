import React, { Component } from 'react'
import { getList } from '@/api/list'
import { List } from 'antd'

class KList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount () {
    this.getList()
  }
  
  getList = () => {
    getList().then(({ data }) => {
      if (data.code === 0) {
         this.setState({
           data: data.data || []
         })
      }
    })
  }
  render () {
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={this.state.data}
          render={item => {
            <List.Item>
              <List.Item.Meta title={item.title} description={item.content}/>
            </List.Item>
          }}
         />
      </div>
    )
  }
}

export default KList