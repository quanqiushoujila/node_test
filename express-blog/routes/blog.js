const express = require('express')
const { SuccessModel, ErrorModel } = require( '../model/resModel')
const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')
let router = express.Router()

router.get('/list', loginCheck, (req, res, next) => {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  let result = getList(author, keyword).then(data => {
    if (data) {
        return new SuccessModel(data)
      } else {
        return new ErrorModel(message = '搜索失败')
      }
  })
})