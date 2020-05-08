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
  req.query = querystring.parse(url.split('?')[1])

  req.cookies = {}
  const cookiesStr = req.headers.cookie || ''
  // console.log('cookiesStr', cookiesStr)
  cookiesStr.split(';').forEach((item) => {
    if (!item) {
      return
    }
    const val = item.split('=')
    const key = val[0].trim()
    const value = val[1].trim()
    req.cookies = {
      key: value
    }
  })
  // console.log('第一步')
  getPostData(req, res).then((data) => {
    // console.log('第二步')
    req.body = data
    // console.log(req.method, req.path)
    let blogResult = handelBlogRouter(req, res)
    // console.log('第三步', blogResult)
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData))
      })
      return
    }
    let userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        res.end(JSON.stringify(userData))
      })
      return
    }

    // 未命中路由，返回 404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
  })

}

module.exports = serverHandle