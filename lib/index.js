
const itsAbsolute = require('./links.js').itsAbsolute;
const changeToAbsolute = require('./links.js').changeToAbsolute;
const getArrLinks = require('./links.js').getArrLinks;
const validateLinks = require('./links.js').validateLinks;
const isValidRoute = require('./links.js').isValidRoute;


// eslint-disable-next-line consistent-return
const mdLinks = (path, options) => new Promise((resolve, reject) => {
  let newPath = path;
  if (isValidRoute(path)) {
    if (!itsAbsolute(path)) {
      newPath = changeToAbsolute(path);
    }
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
  mdLinks,
};
