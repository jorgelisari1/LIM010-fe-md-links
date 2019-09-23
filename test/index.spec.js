const getArrLinks = require('../lib/index.js').getArrLinks;
const mdLinks = require('../lib/index.js').mdLinks;
// const validateLinks = require('../lib/links').validateLinks;

const route = 'C:\\Users\\User\\Desktop\\LIM010-fe-md-links\\test\\folder';
const arrInput = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdow',
    text: 'Markdown',
    file: 'C:\\Users\\User\\Desktop\\LIM010-fe-md-links\\test\\folder\\ALGO.md',
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:\\Users\\User\\Desktop\\LIM010-fe-md-links\\test\\folder\\ALGO.md',
  },
  {
    href: 'https://www.laboratoria.com',
    text: 'laboratoria 1111111111111111111111111111111111111',
    file: 'C:\\Users\\User\\Desktop\\LIM010-fe-md-links\\test\\folder\\ALGO.md',
  }];
const arrOutput = [{
  href: 'https://es.wikipedia.org/wiki/Markdow',
  text: 'Markdown',
  file: 'C:\\Users\\User\\Desktop\\LIM010-fe-md-links\\test\\folder\\ALGO.md',
  status: 404,
  statusText: 'Fail',
},
{
  href: 'https://nodejs.org/',
  text: 'Node.js',
  file: 'C:\\Users\\User\\Desktop\\LIM010-fe-md-links\\test\\folder\\ALGO.md',
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://www.laboratoria.com',
  text: 'laboratoria 1111111111111111111111111111111111111',
  file: 'C:\\Users\\User\\Desktop\\LIM010-fe-md-links\\test\\folder\\ALGO.md',
  status: '',
  statusText: 'Este link no existe',
}];

describe('getArrLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof getArrLinks).toBe('function');
  });
  it('Debería retornar un array de objetos [{href,text,file}]', () => getArrLinks(route)
    .then((res) => {
      expect(res).toEqual([{ file: 'C:\\Users\\User\\Desktop\\LIM010-fe-md-links\\test\\folder\\ALGO.md', href: 'https://es.wikipedia.org/wiki/Markdow', text: 'Markdown' }, { file: 'C:\\Users\\User\\Desktop\\LIM010-fe-md-links\\test\\folder\\ALGO.md', href: 'https://nodejs.org/', text: 'Node.js' }, { file: 'C:\\Users\\User\\Desktop\\LIM010-fe-md-links\\test\\folder\\ALGO.md', href: 'https://www.laboratoria.com', text: 'laboratoria 1111111111111111111111111111111111111' }]);
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
});
