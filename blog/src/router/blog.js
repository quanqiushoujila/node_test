const { SuccessModel, ErrorModel } = require( '../model/resModel')
const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')

const handleBlogRouter = (req, res) => {
  const method = req.method

  // 列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const result = getList(author, keyword)
    return result.then(data => {
      console.log('列表', data)
      return new SuccessModel(data)
    })
  }
  // 详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    let id = req.query.id
    let data = getDetail(id)
    return new SuccessModel(data)
  }
  // 新增
  if (method === 'POST' && req.path === '/api/blog/create') {
    let result = createBlog(req.body)
    if (result) {
      return new SuccessModel(message = '新增成功')
    } else {
      return new ErrorModel(message = '新增失败')
    }
  }
  // 编辑
  if (method === 'POST' && req.path === '/api/blog/update') {
    let result = updateBlog(req.body)
    if (result) {
      return new SuccessModel(message = '编辑成功')
    } else {
      return new ErrorModel(message = '编辑失败')
    }
  }
  // 删除
  if (method === 'POST' && req.path === '/api/blog/del') {
    let result = deleteBlog(req.body)
    if (result) {
      return new SuccessModel(message = '删除成功')
    } else {
      return new ErrorModel(message = '删除失败')
    }
  }
}

module.exports = handleBlogRouter