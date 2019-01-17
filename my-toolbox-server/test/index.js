require('should');
const path = require('path');
const assert = require('assert');
require(path.join(process.cwd(), 'production.js'));

const axios = require('axios');
axios.defaults.baseURL = 'http://127.0.0.1:8360';

axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  config.headers.authtoken = '123456789';
  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

before(() => {
  console.log('before');
});

after(() => {
  console.log('after');
});
const crypto = require('crypto');
const sha = crypto.createHash('sha256');
let sha256 = str => sha.update(str).digest('hex');

describe('测试', function() {
  it('/index/index', async function() {

    let res = await axios.request({
      method: 'post',
      url: '/index/index',
      data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
      }
    });
    console.log(res.data);

    assert.strictEqual(res.data.errno, 0);
  });
  it('auth_sign', async function() {

    const timestamp = Date.now();
    const sign = sha256(`${this._appKey}${timestamp}${this._masterSecret}`);

    let res = await axios.request({
      method: 'post',
      url: '/api/auth_sign',
      data: {
        sign,
        timestamp
      }
    });
    console.log(res.data);

    assert.strictEqual(res.data.errno, 0);
  });
});
