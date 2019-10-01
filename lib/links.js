const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const isValidRoute = route => fs.existsSync(route);

const itsAbsolute = route => path.isAbsolute(route);

const changeToAbsolute = relativeRoute => path.resolve(relativeRoute);


const isFilePath = (route) => {
  const stats = fs.lstatSync(route);
  const answerStat = stats.isFile();
  return answerStat;
};

// C:\Users\User\Desktop\LIM010-fe-md-links\test
const getFiles = (route) => {
  let arrPathFiles = [];
  if (isFilePath(route)) {
    arrPathFiles.push(route);
  } else {
    const readDirectory = fs.readdirSync(route);
    readDirectory.forEach((file) => {
      const pathFile = path.join(route, file);
      // C:\Users\User\Desktop\LIM010-fe-md-links\test\folder
      arrPathFiles = arrPathFiles.concat(getFiles(pathFile));
    });
  }
  return arrPathFiles;
};

const searchFilesMd = arrPaths => arrPaths.filter(file => path.extname(file) === '.md');

const getContent = route => fs.readFileSync(route).toString();

const getLinks = (routeFile, content) => {
  let contentFile = content;
  const arr = [];
  for (let i = 0; i < contentFile.length; i + 1) {
    const aux = contentFile.indexOf('[');
    const aux2 = contentFile.indexOf(']');
    const aux3 = contentFile.indexOf(')');
    if (aux === -1) {
      i = content.length;
    } else if (aux2 + 1 === contentFile.indexOf('(')) {
      let auxTex = contentFile.slice(aux + 1, aux2);
      if (auxTex.length > 50) {
        auxTex = auxTex.substr(0, 49);
      }
      arr.push({
        href: contentFile.slice(aux2 + 2, aux3),
        text: auxTex,
        file: routeFile,
      });
    }


    contentFile = contentFile.slice(aux3 + 1, contentFile.length + 1);
  }
  return arr;
};

const validateLinks = (arrLinks) => {
  const arrPromises = arrLinks.map(element => new Promise(resolve => fetch(element.href)
    .then((res) => {
      const link = { ...element };
      if (res.status >= 200 && res.status < 400) {
        link.status = res.status;
        link.statusText = res.statusText;
        resolve(link);
      } else {
        link.status = res.status;
        link.statusText = 'Fail';
        resolve(link);
      }
    })
    .catch(() => {
      const link = { ...element };
      link.status = ':not exist';
      link.statusText = 'Fail';
      resolve(link);
    })));
  return Promise.all(arrPromises);
};

module.exports = {
  isValidRoute,
  itsAbsolute,
  changeToAbsolute,
  isFilePath,
  getFiles,
  searchFilesMd,
  getContent,
  getLinks,
  validateLinks,
};
