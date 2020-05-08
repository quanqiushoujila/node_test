import React, { Component } from 'react'
import { getList } from '@/api/list'
import { List, Input } from 'antd'
import { Link } from 'react-router-dom'
const { Search } = Input

class KList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      title: ''
    }
  }

  componentDidMount () {
    this.getData()
  }

  getData = () => {
    let params = {}
    if (this.state.title) {
      params.keyword = this.state.title
    }
    getList(params).then(({ data }) => {
      if (data.code === 0) {
       this.setState({
         data: data.data || []
       })
      }
    })
  }

  onSearch = (title) => {
    this.setState(() => {
      return {
        title
      }
    }, () => {
      this.getData()
    })
  }

  goToDetail = (id) => {
    console.log(id)
  }

  render () {
    return (
      <div>
        <div>
          <Search
            placeholder="请输入关键字"
            enterButton="搜索"
            size="large"
            onSearch={value => this.onSearch(value)}
          />
          <Link to={`/form`}>新增</Link>
        </div>
        <List
          bordered
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item>
              <Link to={`/detail?id=${item.id}`}>
                <List.Item.Meta title={item.title} description={item.content}/>
                <Link to={`/form?id=${item.id}`}>修改</Link>
              </Link>
            </List.Item>
          )}/>
      </div>
    )
  }
}

export default KList