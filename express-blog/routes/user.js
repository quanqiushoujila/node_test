var express = require('express');
const { SuccessModel, ErrorModel } = require( '../model/resModel')
const { loginCheck, register } = require('../controller/user')
var router = express.Router();

router.post('/login', function(req, res, next) {
  const result = loginCheck(req.body)
  return result.then(data => {
    if (data.username) {
      req.session.username = data.username
      req.session.realname = data.realname
      res.json(new SuccessModel('登录成功'))
    } else {
      res.json(new ErrorModel('登录失败'))
    }
  })
});

router.post('/register', function(req, res, next) {
  console.log('注册')
  const result = register(req.body)
  return result.then(data => {
    if (data.id) {
      res.json(new SuccessModel('注册成功'))
    } else {
      res.json(new ErrorModel('注册失败'))
    }
  })
});

module.exports = router;
