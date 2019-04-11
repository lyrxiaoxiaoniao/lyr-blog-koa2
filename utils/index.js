const path = require('path');
const fs = require('fs');
/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 */
const checkDirExist = p => {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
};

/**
 * @description 生成文件夹名称 yyyy-mm-dd
 */
const getUploadDirName = () => {
  const date = new Date();
  let month = Number.parseInt(date.getMonth()) + 1;
  month = month.toString().length > 1 ? month : `0${month}`;
  const dir = `${date.getFullYear()}${month}${date.getDate()}`;
  return dir;
};

/**
 * @description 获取文件后缀
 */
const getUploadFileExt = name => {
  let ext = name.split('.');
  return ext[ext.length - 1];
};

const getUploadFileName = ext => {
  return `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`;
};

module.exports = {
  checkDirExist,
  getUploadDirName,
  getUploadFileExt,
  getUploadFileName
};
