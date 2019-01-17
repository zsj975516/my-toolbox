const Base = require('./base.js');

const fs = require('fs');
const path = require('path');
const {auth, mkdir} = require('../util/util');

module.exports = class extends Base {
  auth_signAction() {
    let pmt = this.post();
    let res = auth(pmt);
    if (res.succ) {
      this.success(res.data);
    } else {
      this.fail(res.data);
    }
  }

  auth_closeAction() {
    console.log(this.post());
  }

  updateFileAction() {
    let fileList = [this.file()];

    let files = [];
    fileList.map(file => {
      let newfilePath = `www/upload/${path.basename(file.file.path)}`;
      mkdir(newfilePath);
      fs.copyFileSync(file.file.path, newfilePath);
      files.push({
        path: newfilePath
      });
    });
    return this.success(files);
  }

  downloadFileAction() {
    let filePath = this.get('filePath');
    let fileName = this.get('fileName');
    let fileUrl = path.resolve(think.ROOT_PATH, filePath);
    if (!fs.existsSync(fileUrl)) return this.fail('路径不存在');
    if (fileName) {
      this.download(fileUrl, encodeURIComponent(this.get('fileName')));
    } else {
      this.download(fileUrl);
    }
  }
};
