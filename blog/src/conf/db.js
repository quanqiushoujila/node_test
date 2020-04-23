const env = process.env.NODE_ENV

let MYSQL_CONF

if (env === 'dev') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'blog'
  }
}

if (env === 'production') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'blog'
  }
}

module.exports = {
  MYSQL_CONF
}