const express = require('express')
const { SuccessModel, ErrorModel } = require( '../model/resModel')
const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')
let router = express.Router()

router.get('/list', loginCheck, (req, res, next) => {
  console.log('list列表')
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  let result = getList(author, keyword).then(data => {
    if (data) {
      res.json(new SuccessModel(data))
    } else {
      res.json(new ErrorModel(message = '搜索失败'))
    }
  })
})

module.exports = router