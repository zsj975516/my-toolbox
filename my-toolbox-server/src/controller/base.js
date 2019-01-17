const {validateAuth} = require('../util/util');

const need_not_auth_list = ['auth_sign', 'downloadFile', 'updateFile'];

module.exports = class extends think.Controller {
  __before() {
    this.header('Access-Control-Allow-Credentials', 'true');
    this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
    if (this.ctx.req.method === 'OPTIONS') {
      this.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, authtoken');
      this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
      this.status = 200;
      return false;
    }

    let isNotAuth = need_not_auth_list.find(item => item === this.ctx.action);

    if (!isNotAuth) {
      let isAuth = validateAuth(this.ctx.req.headers.authtoken);
      if (!isAuth) {
        this.fail('鉴权失败');
        return false;
      }
    }
  }
};
