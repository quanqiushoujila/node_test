const express = require('express')
const { SuccessModel, ErrorModel } = require( '../model/resModel')
const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')
let router = express.Router()

router.get('/list', (req, res, next) => {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  let result = getList(author, keyword).then(data => {
    if (data) {
      res.json(new SuccessModel(data))
    } else {
      res.json(new ErrorModel('搜索失败'))
    }
  })
})
router.get('/detail', (req, res, next) => {
  const id = req.query.id
  if (!id) {
    return new ErrorModel(message = '详情失败')
  }
  const result = getDetail(id)
  return result.then(data => {
    if (data) {
      res.json(new SuccessModel(data, '获取详情成功'))
    } else {
      res.json(new ErrorModel('详情失败'))
    }
  })
})
router.post('/create', loginCheck, (req, res, next) => {
  const result = createBlog(req.body)
  return result.then(data => {
    if (data.id) {
      res.json(new SuccessModel('新增成功'))
    } else {
      res.json(new ErrorModel('新增失败'))
    }
  })
})
router.get('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.body)
  return result.then(data => {
    if (data) {
      res.json(new SuccessModel('编辑成功'))
    } else {
      res.json(new ErrorModel('编辑失败'))
    }
  })
})
router.get('/delete', loginCheck, (req, res, next) => {
  const result = deleteBlog(req.body)
  return result.then(data => {
    if (data) {
      res.json(new SuccessModel('删除成功'))
    } else {
      res.json(new ErrorModel('删除失败'))
    }
  })
})
module.exports = router