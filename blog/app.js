const handelBlogRouter = require( './src/router/blog')
const handleUserRouter = require( './src/router/user')
const querystring = require('querystring')
const { get, set } = require('./src/db/redis')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString())
    return d.toGMTString()
}

const getPostData = (req) => {
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
      [key]: value
    }
  })

  let needSetCookie = false
  let userId = req.cookies.userid
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    set(userId, {})
  }
  req.sessionId = userId
  get(req.sessionId).then((sessionData) => {
    if (sessionData == null) {
      // 初始化 redis 中的 session 值
      set(req.sessionId, {})
      // 设置 session
      req.session = {}
    } else {
      // 设置 session
      req.session = sessionData
    }
    return getPostData(req)
  }).then((data) => {
    req.body = data
    let blogResult = handelBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(blogData))
      })
      return
    }
    let userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
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