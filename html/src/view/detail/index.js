import React, { Component } from 'react'
import { getDetail } from '@/api/list'
import { useLocation } from 'react-router-dom'

class Detail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      params: {}
    }
  }

  componentDidMount (event) {
    let obj = this.getSearchParams(this.props.location.search)
    this.setState(() => {
      return {
        params: obj
      }
    }, () => {
      this.getList(this.state.params.id)
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

  getList = (id) => {
    console.log('id', id)
    if (id) {
      getDetail({id}).then(({ data }) => {
        if (data.code === 0) {
          this.setState({
            data: data.data
          })
        }
      })
    }
  }

  render () {
    const { data } = this.state
    return (
      <div>
        <h1>{data.title}</h1>
        <p>{data.createTime} {data.author}</p>
        <p>{data.content}</p>
      </div>
    )
  }
}

export default Detail
