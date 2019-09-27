
const itsAbsolute = require('./links.js').itsAbsolute;
const changeToAbsolute = require('./links.js').changeToAbsolute;
const getFiles = require('./links.js').getFiles;
const searchFilesMd = require('./links.js').searchFilesMd;
const getContent = require('./links.js').getContent;
const getLinks = require('./links.js').getLinks;
const validateLinks = require('./links.js').validateLinks;
const isValidRoute = require('./links.js').isValidRoute;

const getArrLinks = route => new Promise((resolve) => {
  const arrPathFiles = getFiles(route);
  const arrMd = searchFilesMd(arrPathFiles);
  const arrLinks = arrMd.map(elem => getLinks(elem, getContent(elem)));
  const newArr = [];
  arrLinks.forEach((element) => {
    element.forEach((elem) => {
      newArr.push(elem);
    });
  });
  resolve(newArr);
});

// eslint-disable-next-line consistent-return
const mdLinks = (path, options) => new Promise((resolve, reject) => {
  let newPath = path;
  if (isValidRoute(path)) {
    if (!itsAbsolute(path)) newPath = changeToAbsolute(path);
    if (options === undefined || !options.validate) {
      return getArrLinks(newPath)
        .then(response => resolve(response));
    }
    if (options.validate === true) {
      return getArrLinks(newPath)
        .then((res) => {
          validateLinks(res)
            .then(resp => resolve(resp));
        });
    }
  } else {
    reject(new Error('invalid route'));
  }
});

module.exports = {
  getArrLinks, mdLinks,
};
