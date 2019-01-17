let config = JSON.parse(JSON.stringify(window.$config))
delete window.$config

const axios = require('axios')
const EventEmitter = require('events').EventEmitter

const {aesEncrypt} = require('../util/util')

axios.defaults.baseURL = `http://${config.serverIp}:${config.serverPort}`
axios.defaults.withCredentials = true

let authToken = ''
let ev = new EventEmitter()

axios.interceptors.request.use(async function (config) {
  if (config.url !== '/api/auth_sign') await awaitAuth()

  config.headers.authtoken = authToken
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  if (response.data.errno) throw new Error(response.data.errmsg)
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

async function request (url, params, method = 'get') {
  try {
    let config = {
      method,
      url
    }

    if (method === 'get' || method === 'delete') {
      config.params = params
    } else {
      config.data = params
    }

    let res = await axios.request(config)
    return res.data.data
  } catch (e) {
    console.error(`请求【${url}】-${method}失败，失败原因：`, e.message)
    throw e
  }
}

function awaitAuth () {
  if (authToken) return
  return new Promise((resolve, reject) => {
    ev.once('auth', resolve)
    auth()
  })
}

async function auth () {
  try {
    const timestamp = Date.now()
    const KEY = 'my-toolbox'
    const sign = aesEncrypt(`${timestamp}`, KEY)

    let res = await request('/api/auth_sign', {
      timestamp, sign
    }, 'post')
    authToken = res.auth_token
  } catch (e) {
    console.error(e)
  } finally {
    ev.emit('auth')
  }
}

function login ({username, password}) {
  if (!username) throw new Error('请输入用户名')
  if (!password) throw new Error('请输入密码')
  return request('/user/login', {username, password}, 'post')
}

function getUser (params) {
  return request('/user', params, 'get')
}

function addUser (params) {
  return request('/user', params, 'post')
}

function updateUser (params) {
  return request('/user', params, 'put')
}

function deleteUser (params) {
  return request('/user', params, 'delete')
}

const install = (Vue, option) => {
  Vue.prototype.$api = {config, request, login, getUser, addUser, updateUser, deleteUser}
}

export default install
