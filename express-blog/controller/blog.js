const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = (author, keywork) => {
  let sql = 'select * from blogs where 1=1 '
  if (author) {
    sql += `and author = '${author}' `
  }
  if (keywork) {
    sql += `and title like '%${keywork}%' `
  }
  sql += 'order by createtime desc;'
  return exec(sql)
}

const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`
  return exec(sql).then((row) => {
    return row[0]
  })
}

const createBlog = (data = {}) => {
  const title = xss(data.title)
  const content = xss(data.content)
  const author = xss(data.author)
  const createTime = Date.now()

  const sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', '${createTime}')`
  // console.log('新增sql', sql)
  return exec(sql).then((data) => {
    return {
      id: data.insertId
    }
  })
}

const updateBlog = (data = {}) => {
  const title = xss(data.title)
  const content = xss(data.content)
  const author = xss(data.author)

  const sql = `update blogs set title='${title}', content='${content}' where id=${data.id}`
  // console.log('创建sql', sql)
  return exec(sql).then((data) => {
    if (data.affectedRows > 0) {
        return true
    }
    return false
  })
}

const deleteBlog = (data = {}) => {
  const sql = `delete from blogs where id=${data.id}`
  return exec(sql).then((data) => {
    if (data.affectedRows > 0) {
        return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog
}