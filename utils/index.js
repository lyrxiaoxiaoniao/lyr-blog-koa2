const path = require('path');
const fs = require('fs');
/**
 * @description 递归删除文件夹
 */
const rmdirSync = (dirPath) => {
  let files = fs.readdirSync(dirPath);
  // console.log(files);
  files.forEach( child => {
      let childPath = dirPath + '/' + child;
      // 当前child可能是文件也有可能是文件夹
      if ( fs.statSync(childPath).isDirectory() ) {
          //因为文件夹里面可能还会有子文件，所以也不能直接删除
          //而是需要调用rmdirSync方法
          rmdirSync(childPath);
      } else {
          // 删除每一个子文件
          fs.unlinkSync(childPath);
      }

  } );
  fs.rmdirSync(dirPath);
}

/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹 递归创建目录 同步方法
 */
const checkAndMkdirsSync = dirname => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (checkAndMkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
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
  rmdirSync,
  checkAndMkdirsSync,
  getUploadDirName,
  getUploadFileExt,
  getUploadFileName
};
