const xss = require('xss')
const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp.js')

const loginCheck = (data = {}) => {
  const username = escape(data.username)
  const password = escape(genPassword(data.password))
  const sql = `select username, realname from users where username='${username}' and password='${password}'`
  return exec(sql).then(rows => {
    // console.log('返回结果', rows)
    return rows[0] || {}
  })
}

const register = (data) => {

}

module.exports = {
  loginCheck,
  register
}