const xss = require('xss')
const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp.js')

const loginCheck = (data = {}) => {
  const username = escape(data.username)
  const password = escape(genPassword(data.password))
  const sql = `select username, realname from users where username=${username} and password=${password}`
  console.log('sql', sql)
  return exec(sql).then(rows => {
    // console.log('返回结果', rows)
    return rows[0] || {}
  })
}

const register = (data = {}) => {
  const username = data.username
  const password = genPassword(data.password)
  const realname = data.realname
  const sql = `insert into users (username, password, realname) values('${username}', '${password}', '${realname}')`
  return exec(sql).then((data) => {
    return {
      id: data.insertId
    }
  })
}

module.exports = {
  loginCheck,
  register
}