#!/usr/bin/env node
const getTotalLinks = require('./stats.js').getTotalLinks;
const getDiferentTotalLinks = require('./stats.js').getDiferentTotalLinks;
const mdLinks = require('./index.js').mdLinks;

const arg = process.argv.slice(2);
if (arg.length === 0) {
  console.log('Enter a route, example: md-links ./some/example.\n');
} else if (arg.length === 1) {
  mdLinks(arg[0])
    .then(res => res.forEach((elem) => {
      console.log(`${elem.file} ${elem.href} ${elem.text}`);
    }))
    .catch(error => console.log(error));
}
if (arg.length === 2) {
  if (arg[1] === '--validate' || arg[1] === '--v') {
    mdLinks(arg[0], { validate: true })
      .then(res => res.forEach((elem) => {
        console.log(`${elem.file} ${elem.href} ${elem.statusText} ${elem.status} ${elem.text}`);
      }));
  } else if (arg[1] === '--stats' || arg[1] === '--s') {
    mdLinks(arg[0], { validate: true })
      .then((res) => {
        console.log(getTotalLinks(res));
        console.log(getDiferentTotalLinks(res));
      });
  }
}
if (arg.length === 3) {
  if ((arg[1] === '--stats' || arg[1] === '--s') && (arg[2] === '--validate' || arg[2] === '--v')) {
    mdLinks(arg[0], { validate: true })
      .then((res) => {
        console.log(getTotalLinks(res));
        console.log(getDiferentTotalLinks(res));
        const arrStatus = [];
        res.forEach((elem) => {
          arrStatus.push(elem.statusText);
        });
        const statusFail = (arrStatus.filter(elem => elem === 'Fail')).length;
        console.log(`Broken: ${statusFail}`);
      });
  } else {
    console.log('Enter the commands correctly');
  }
}
