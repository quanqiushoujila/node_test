import { ErrorModel } from '../model/resModel'

export default (req, res, next) => {
  if (req.session.username) {
    next()
  } else {
    res.json(
      new ErrorModel('未登录')
    )
  }
}