const { SuccessModel, ErrorModel } = require( '../model/resModel')
const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')

const handleBlogRouter = (req, res) => {
  const method = req.method

  // 列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const result = getList(author, keyword)
    console.log('列表')
    return result.then(data => {
      console.log('列表', data)
      if (data) {
        return new SuccessModel(data)
      } else {
        return new ErrorModel(message = '搜索失败')
      }
    })
  }
  // 详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id
    if (!id) {
      return new ErrorModel(message = '详情失败')
    }
    const result = getDetail(id)
    return result.then(data => {
      if (data) {
        return new SuccessModel(data, message = '获取详情成功')
      } else {
        return new ErrorModel(message = '详情失败')
      }
    })
  }
  // 新增
  if (method === 'POST' && req.path === '/api/blog/create') {
    // console.log('新增', req.body)
    const result = createBlog(req.body)
    return result.then(data => {
      if (data.id) {
        return new SuccessModel(message = '新增成功')
      } else {
        return new ErrorModel(message = '新增失败')
      }
    })
  }
  // 编辑
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(req.body)
    return result.then(data => {
      if (data) {
        return new SuccessModel(message = '编辑成功')
      } else {
        return new ErrorModel(message = '编辑失败')
      }
    })
  }
  // 删除
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const result = deleteBlog(req.body)
    return result.then(data => {
      if (data) {
        return new SuccessModel(message = '删除成功')
      } else {
        return new ErrorModel(message = '删除失败')
      }
    })
  }
}

module.exports = handleBlogRouter