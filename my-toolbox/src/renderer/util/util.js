const crypto = require('crypto')

export function getRandomId (num = 10) {
  const arr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let id = ''
  for (let i = 0; i < num; i++) {
    let index = Math.floor(Math.random() * arr.length)
    id += arr[index]
  }
  return id
}

export function aesEncrypt (data, key) {
  const cipher = crypto.createCipher('aes192', key)
  let crypted = cipher.update(data, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

export function aesDecrypt (encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
