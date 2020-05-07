const { SuccessModel, ErrorModel } = require( '../model/resModel')
const { loginCheck } = require('../controller/user')

const handleUserRouter = (req, res) => {
  const method = req.method

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const result = loginCheck(req.body)
    return result.then(data => {
      if (data.username) {
        return new SuccessModel(message = '登录成功')
      } else {
        return new ErrorModel(message = '登录失败')
      }
    })
  }
}

module.exports = handleUserRouter