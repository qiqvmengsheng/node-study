import http from 'node:http'
import url from 'node:url'
import { createProxyMiddleware } from 'http-proxy-middleware'

const config = require('./xm.config.js')
console.log(config)

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url ?? '')
    console.log(pathname)
    const proxyList = Object.keys(config.serve.proxy)
    if (proxyList.includes(pathname ?? '')) {
      const proxy = createProxyMiddleware(config.serve.proxy[pathname ?? ''])
      proxy(req, res, () => {})
      return
    }
    let data = ''
    req.on('data', chunk => {
      data += chunk
      console.log(data)
    })

    res.end('请求成功')
  })
  .listen(98, () => {
    console.log('启动成功')
  })
