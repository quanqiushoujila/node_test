const getList = (author, keywork) => {
  return [
    {
      id: 1,
      title: '标题',
      content: '内容',
      createTime: '2020',
      author: '作者'
    }
  ]
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
  return true
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