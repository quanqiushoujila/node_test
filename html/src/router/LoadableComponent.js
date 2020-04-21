import React, { Component } from 'react'
import { Spin } from 'antd'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

class LoadingPage extends Component {
  componentWillMount (){
    NProgress.start()
  }
  componentWillUnmount (){
    NProgress.done()
  }
  render () {
    const styles = {
      'textAlign': 'center',
      'marginTop': '20px'
    }
    return (
      <div style={styles}><Spin tip="Loading..."/></div>
    )
  }
}

const LoadableComponent = (component) => {
  return Loadable({
    loader: () => component,
    loading: () => <LoadingPage/>
  })
}

export default LoadableComponent
