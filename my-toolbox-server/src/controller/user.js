const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  async loginAction() {
    let pmt = this.post();
    let user = this.model('user');
    let data = await user.where(pmt).find();
    if (think.isEmpty(data)) {
      this.fail('用户名或密码不正确！');
    } else {
      this.success(data);
    }
  }
};
