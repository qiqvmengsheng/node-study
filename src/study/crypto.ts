import crypto from 'node:crypto'
import * as ed from '@noble/ed25519'
// 对称加密算法
// 双方协商定义一个密钥和iv
// 第一个参数算法，第二个参数密钥，
// 第三个参数iv 初始化向量 保证每次密钥串不一样，密钥串缺少位数可进行补码

// const key = crypto.randomBytes(32)

// const iv = Buffer.from(crypto.randomBytes(16))
// const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)

// cipher.update('小', 'utf8', 'hex')
// const result = cipher.final('hex')
// console.log(result)

// const de = crypto.createDecipheriv('aes-256-cbc', key, iv)
// de.update(result, 'hex', 'utf8')

// console.log(de.final('utf-8'))

// 非对称加密算法

// const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//   modulusLength: 2048,
// })
// const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519', {
//   publicKeyEncoding: {
//     type: 'spki',
//     format: 'pem',
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8',
//     format: 'pem',
//     passphrase: 'Mid9Rain',
//     cipher: 'aes-256-cbc', // 设置passphrase时必填
//   },
// })

// const encrypted = crypto.publicEncrypt(publicKey, Buffer.from('zs'))
// console.log(encrypted.toString('hex'))

// const decrypted = crypto.privateDecrypt(privateKey, encrypted)
// console.log(decrypted.toString('utf-8'))

// 公钥加密，私钥解密
// 公钥加密私钥解密
// 私钥加密公钥解密
;async () => {
  // keys, messages & other inputs can be Uint8Arrays or hex strings
  // Uint8Array.from([0xde, 0xad, 0xbe, 0xef]) === 'deadbeef'

  // 获得私钥
  const privateKey = ed.utils.randomPrivateKey()
  // 待签名消息
  const message = Buffer.from([0xab, 0xbc, 0xcd, 0xde])
  // 获得公钥
  const publicKey = await ed.getPublicKeyAsync(privateKey)
  // 签名
  const signature = await ed.signAsync(message, privateKey)
  // 验证
  const isValid = await ed.verifyAsync(signature, message, publicKey)
  console.log(isValid)
}

// 哈希函数
let hash = crypto.createHash('md5')
hash.update('123456')
console.log(hash.digest('hex'))
