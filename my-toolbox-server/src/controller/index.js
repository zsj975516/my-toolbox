const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const user = this.model('user'); // controller 里实例化模型
    const data = await user.select();
    const list = await user.getList();
    return this.success(data);
  }
};
