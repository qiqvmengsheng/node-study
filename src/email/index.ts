import nodemailer from 'nodemailer'
import yaml from 'js-yaml'
import http from 'node:http'
import fs from 'node:fs'
import url from 'node:url'

const config: any = yaml.load(fs.readFileSync('./config.yaml', 'utf-8'))
//初始化邮件服务
console.log(config)

const transport = nodemailer.createTransport({
  host: 'smtp.qq.com',
  post: 465,
  secure: true,
  auth: {
    user: config.user,
    pass: config.pass,
  },
} as any)

http
  .createServer(async (req, res) => {
    const { path } = url.parse(req.url ?? '')
    const { method } = req
    if (method === 'POST' && path === '/send/mail') {
      let data = ''
      req.on('data', chunk => {
        data += chunk
      })

      req.on('end', () => {
        console.log(typeof data)

        // 发送邮件
        const { to, subject, text } = JSON.parse(data)
        transport.sendMail({
          to,
          from: config.user,
          subject,
          text,
        })
      })
      res.end('ok')
    }
  })
  .listen(3000, () => console.log('Listening on port 3000'))
