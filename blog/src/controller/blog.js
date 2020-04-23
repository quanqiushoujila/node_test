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
  // console.log('sql', sql)
  return exec(sql)
}

const getDetail = (id) => {
  return{
    id: 1,
    title: '标题',
    content: '内容',
    createTime: '2020',
    author: '作者'
  }
}

const createBlog = (data = {}) => {
  const title = xss(data.title)
  const content = xss(data.content)
  const author = xss(data.author)
  const createTime = Date.now()
  let sql = `insert into blogs (title, content, author, createtime) values (${title}, ${content}, ${author}, ${createTime}))`
  return exec(sql).then(({ data }) => {
    return {
      id: data.insertId
    }
  })
}

const updateBlog = (data = {}) => {
  return data.id
}

const deleteBlog = (data = {}) => {
  return data.id
}

module.exports = {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog
}