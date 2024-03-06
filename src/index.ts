import './study/util工具'

import express, { Express } from 'express'
const app: Express = express()
app.get('/api/jsonp', (req, res) => {
  const { callback } = req.query
  console.log(callback)

  res.send(`${callback}('Hello World!！！！！！！！！！')`)
})
app.listen(3000, () => {
  console.log('http://localhost:3000')
})

const main = () => {}

main()
