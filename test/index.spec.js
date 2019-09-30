const getArrLinks = require('../lib/index.js').getArrLinks;
const mdLinks = require('../lib/index.js').mdLinks;
// const validateLinks = require('../lib/links').validateLinks;

const cwd = process.cwd().concat('\\test\\folder');
const arrInput = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdow',
    text: 'Markdown',
    file: cwd.concat('\\ALGO.md'),
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: cwd.concat('\\ALGO.md'),
  },
  {
    href: 'https://www.laboratoria.com',
    text: 'laboratoria 1111111111111111111111111111111111111',
    file: cwd.concat('\\ALGO.md'),
  }];
const arrOutput = [{
  href: 'https://es.wikipedia.org/wiki/Markdow',
  text: 'Markdown',
  file: cwd.concat('\\ALGO.md'),
  status: 404,
  statusText: 'Fail',
},
{
  href: 'https://nodejs.org/',
  text: 'Node.js',
  file: cwd.concat('\\ALGO.md'),
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://www.laboratoria.com',
  text: 'laboratoria 1111111111111111111111111111111111111',
  file: cwd.concat('\\ALGO.md'),
  status: ':not exist',
  statusText: 'Fail',
}];

describe('getArrLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof getArrLinks).toBe('function');
  });
  it('Debería retornar un array de objetos [{href,text,file}]', () => getArrLinks(cwd)
    .then((res) => {
      expect(res).toEqual([{ file: cwd.concat('\\ALGO.md'), href: 'https://es.wikipedia.org/wiki/Markdow', text: 'Markdown' }, { file: cwd.concat('\\ALGO.md'), href: 'https://nodejs.org/', text: 'Node.js' }, { file: cwd.concat('\\ALGO.md'), href: 'https://www.laboratoria.com', text: 'laboratoria 1111111111111111111111111111111111111' }]);
    }));
});

describe('mdLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Debería retornar un array de objetos [{href, text, file}]', () => mdLinks('test\\folder')
    .then((res) => {
      expect(res).toEqual(arrInput);
    }));
  it('Debería retornar un array de objetos con status [{href, text, file, status, statusText}]', () => mdLinks('test\\folder', { validate: true })
    .then((res) => {
      expect(res).toEqual(arrOutput);
    }));
  it('Debería retornar "Error: invalid route"', () => mdLinks('test\\foldering', { validate: true })
    .catch((error) => {
      expect(error.message).toBe('invalid route');
    }));
});
