const { SuccessModel, ErrorModel } = require( '../model/resModel')
const { loginCheck, register } = require('../controller/user')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const result = loginCheck(req.body)
    return result.then(data => {
      if (data.username) {
        req.session.username = data.username
        req.session.realname = data.realname
        set(req.sessionId, req.session)
        return new SuccessModel(message = '登录成功')
      } else {
        return new ErrorModel(message = '登录失败')
      }
    })
  }

  // 注册
  if (method === 'POST' && req.path === '/api/user/register') {
    console.log('注册', req.body)
    const result = register(req.body)
    return result.then(data => {
      if (data.id) {
        return new SuccessModel(message = '注册成功')
      } else {
        return new ErrorModel(message = '注册失败')
      }
    })
  }
}

module.exports = handleUserRouter