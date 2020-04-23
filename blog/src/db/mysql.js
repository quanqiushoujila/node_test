const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

function exec (sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (error, results) => {
      if (error) {
        reject(error)
        return
      }
      resolve(results)
    })
  })
}

module.exports = {
  exec,
  escape: mysql.escape
}