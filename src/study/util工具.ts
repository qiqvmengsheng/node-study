import util from 'node:util'
import { exec } from 'node:child_process'
import to from 'await-to-js'

export default function () {
  console.log('hello world')
  // 执行命令
}

// exec('node -v', (err, stdout, stderr) => {
//   console.log(util.inspect({ err, stdout, stderr }))
// })

const promisify = <T, R>(
  fn: (...args: any[]) => R
): ((...args: any[]) => Promise<T>) => {
  return (...args): Promise<T> =>
    new Promise((resolve, reject) => {
      try {
        const data = fn(resolve, ...args)
      } catch (err) {
        reject(err)
      }
    })
}

const utilpromisify = <T, R>(
  fn: (...args: any[]) => R
): ((...args: any[]) => Promise<T[]>) => {
  return (...args): Promise<T[]> =>
    new Promise((resolve, reject) => {
      try {
        const data = fn(...args, (err: Error | null, ...values: any[]) => {
          if (err) return reject(err)
          if (values && values.length > 1) {
            const obj = {} as typeof values
            for (const key in values) {
              obj[key] = values[key]
            }
            resolve(obj)
          } else {
            resolve(values[0])
          }
        })
      } catch (err) {
        reject(err)
      }
    })
}

// setTimeout(() => {
//   console.log('回调延迟')
// }, 1000)

const timeout = promisify(setTimeout)

// timeout(1000).then(
//   data => {
//     console.log('promise延迟')
//   },
//   () => {
//     console.log('超时2')
//   }
// )

const execPromise = util.promisify(exec)
const fn = async () => {
  const [err, data] = await to(execPromise('node -v'))
  if (err) return console.log(err)
  console.log(data)
}
// fn()
const fn1 = (type: 1 | 0) => {
  if (type === 1) {
    return Promise.resolve(true)
  } else {
    return Promise.reject('error')
  }
}

const callbackify = <T, R>(fn: (...args2: R[]) => Promise<T>) => {
  return (fn2: (err: Error | null, ...args: T[]) => void, ...args2: R[]) => {
    fn(...args2).then(
      (...data) => {
        fn2(null, ...data)
        console.log(data)
      },
      err => {
        fn2(err)
        console.log(err)
      }
    )
  }
}

const fn2 = callbackify(fn1)
// fn2((...args) => {
//   console.log(...args)
// }, 0)

console.log(util.format('hello\t %s\n %j', 'world', { name: 'lzq' }))
