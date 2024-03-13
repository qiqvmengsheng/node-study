import fs, { promises } from 'node:fs'
import fs2 from 'node:fs/promises'
// 1.读取文件 readFile flag
// 2.可读流 createReadStream
// 3.创建文件夹 recurisive 递归
// 4.删除 rm
// 5.重命名 renameSync
// 6.监听文件变化 watch
// 7.源码 libuv
// 8.注意事项 事件循环 setImmediate

// 不加Sync是同步的
// fs.readFile(
//   'src/study/util工具.ts',
//   { encoding: 'utf-8', flag: 'r' },
//   (err, data) => {
//     if (err) throw err
//     console.log(data)
//   }
// )

// console.log(promises === fs2)
// fs2
//   .readFile('src/study/util工具.ts')
//   .then(data => {
//     console.log(data.toString())
//   })
//   .catch(err => {
//     console.log(err)
//   })

// const stream = fs.createReadStream('src/study/util工具.ts')

// stream.on('data', (data: string | Buffer) => {
//   console.log(data)
// })
// stream.on('ready', (data: any) => {
//   console.log('开读', data)
// })
// stream.on('end', (data: any) => {
//   console.log('结束', data)
// })

// fs.mkdirSync('./文件夹1', {
//   // 是否递归创建文件夹
//   recursive: true,
// })

fs.rmSync('./文件夹1', {
  // 是否递归
  recursive: true,
})

// fs.renameSync('432', './文件夹1')

// fs.watch('src/index.ts', (event, filename) => {
//   console.log(event, filename)
// })

// 写入文件 writeFileSync
// 追加写入 flag:'a'
// fs.writeFileSync(
//   '文件夹1/index.ts',
//   `export const fn =()=>{
//   console.log('hello world')
// }`
//   // { flag: 'a' }
// )
// ;(async () => {
//   await import('../../文件夹1/index').then(fn => fn.fn())
// })()

// fs.appendFileSync(
//   '文件夹1/index.ts',
//   `\n ;export const fn2 =()=>{
//   console.log('hello world')
// }`
// )

//  分批写入，可写流,会覆盖 [,{ flags: 'a' }]
// const writeStream = fs.createWriteStream(
//   '文件夹1/index.ts'
//   //  { flags: 'a' }
// )

// writeStream.write(`export const fn =()=>{
//   console.log('hello world')
// }\n`)
// writeStream.write(`\n ;export const fn2 =()=>{
//   console.log('hello world')
// }`)
// writeStream.end()

// 硬链接
// fs.linkSync('文件夹1/index.ts', '文件夹1/index.js')
// // 软链接
// fs.symlinkSync('文件夹1/index.ts', '文件夹1/index2.js')
