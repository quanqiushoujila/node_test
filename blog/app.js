const handelBlogRouter = require( './src/router/blog')
const handleUserRouter = require( './src/router/user')
const querystring = require('querystring')

const getPostData = (req, res) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = (req, res) => {
  const url = req.url
  req.path = url.split('?')[0]
  res.setHeader('Content-type', 'application/json')
  req.query = querystring.parse(url.split('?'))

  getPostData(req, res).then((data) => {
    req.body = data
    let blogData = handelBlogRouter(req, res)
    if (blogData) {
      res.end(JSON.stringify(blogData))
      return
    }
    let userData = handleUserRouter(req, res)
    if (userData) {
      res.end(JSON.stringify(userData))
      return
    }

    // 未命中路由，返回 404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
  })

}

module.exports = serverHandle