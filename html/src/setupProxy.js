const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy.createProxyMiddleware ('/api', {
     // target: 'http://192.168.31.6:9000',
     target: 'http://192.168.12.179:9000',
     secure: false,
     changeOrigin: true,
     pathRewrite: {
      "^/api": "/api"
     },
     // cookieDomainRewrite: "http://localhost:3000"
  }))
}