const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const itsAbsolute = route => path.isAbsolute(route);
const changeToAbsolute = (relativeRoute) => {
  const result = path.resolve(relativeRoute);
  return (result);
};

const isFilePath = (route) => {
  const stats = fs.lstatSync(route);
  const answerStat = stats.isFile();
  return answerStat;
};

const getFiles = (route) => {
  let arrPathFiles = [];
  if (isFilePath(route)) {
    arrPathFiles.push(route);
  } else {
    const readDirectory = fs.readdirSync(route);
    readDirectory.forEach((file) => {
      const pathFile = path.join(route, file);
      arrPathFiles = arrPathFiles.concat(getFiles(pathFile));
    });
  }
  return arrPathFiles;
};

const searchFilesMd = arrPaths => arrPaths.filter(file => path.extname(file) === '.md');

const getContent = route => fs.readFileSync(route).toString();

const getLinks = (routeFile) => {
  let contentFile = getContent(routeFile);
  let arr = [];
  for (let i = 0; i < contentFile.length; i + 1) {
    const aux = contentFile.indexOf('[');
    const aux2 = contentFile.indexOf(']');
    const aux3 = contentFile.indexOf(')');
    if (aux === -1) {
      return arr;
    } else {
      arr.push({
        href: contentFile.slice(aux2 + 2, aux3 ),
        text: contentFile.slice(aux + 1, aux2 ),
        file: routeFile,
      });
    }

    contentFile = contentFile.slice(aux3 + 1, contentFile.length+1);
  }
  return arr;
};

const validateLinks = (arrLinks) => {
  const arrPromises = arrLinks.map(element => new Promise(resolve => {
    return (fetch)(element.href).then(res => {
      if (res.status >= 200 && res.status < 400) {
        element.status = res.status;
        element.statusText = res.statusText;
        resolve(element);
      } else {
        element.status = res.status;
        element.statusText = 'Fail';
        resolve(element);
      }
    }).catch(() => {
      element.status = '';
      element.statusText = 'Este link no existe';
      resolve(element);
    });
  }));
  return Promise.all(arrPromises).then(res => {
    return res;
  });
};

module.exports = {
  itsAbsolute,
  changeToAbsolute,
  isFilePath,
  getFiles,
  searchFilesMd,
  getContent,
  getLinks,
  validateLinks,
};
