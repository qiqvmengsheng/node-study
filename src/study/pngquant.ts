import { exec } from 'node:child_process'
import util from 'node:util'

exec('pngquant --version', (err, stdout, stderr) => {
  console.log(util.inspect({ err, stdout, stderr }))
})
exec(
  'cd ./src && pngquant ./study/kb.png --speed=1 --quality=90 --output ./test2.png'
)
// exec('pngquant ./study/kb.png --output ./test2.png')
// exec('node -v', (err, stdout, stderr) => {
//   console.log(util.inspect({ err, stdout, stderr }))
// })
