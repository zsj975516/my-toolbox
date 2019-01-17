const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const KEY = 'my-toolbox';
const EXPIRETIME = 23;

function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

function aesDecrypt(encrypted = '', key) {
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports.mkdir = function mkdir(filePath = '') {
  if (!path.isAbsolute(filePath)) filePath = path.resolve(think.ROOT_PATH, filePath);
  filePath.split('\\').reduce((dir, dirName, index) => {
    if (index) dir += '\\';
    dir += dirName;
    if (!fs.existsSync(dir) && !path.extname(dir)) fs.mkdirSync(dir);
    return dir;
  }, '');
};

let auth_list = [];

module.exports.auth = function auth(pmt) {
  if (!pmt.sign || !pmt.timestamp || Number(aesDecrypt(pmt.sign, KEY)) !== pmt.timestamp) {
    return {
      succ: false,
      data: '参数错误'
    };
  }
  let auth_token = aesEncrypt(JSON.stringify({authTime: pmt.timestamp}), KEY);
  auth_list.push(auth_token);
  return {
    succ: true,
    data: {auth_token: auth_token}
  };
};

module.exports.unauth = function unauth(authtoken) {
  let index = auth_list.findIndex(item => item === authtoken);
  if (index > -1) auth_list.splice(index, 1);
};

module.exports.validateAuth = function validateAuth(authtoken) {
  let index = auth_list.findIndex(item => item === authtoken);
  if (index === -1) return false;
  const authToken = JSON.parse(aesDecrypt(authtoken, KEY));
  return Date.now() - Number(authToken.authTime) < EXPIRETIME * 60 * 60 * 1000;
};

module.exports.aesDecrypt = aesDecrypt;
module.exports.aesEncrypt = aesEncrypt;

