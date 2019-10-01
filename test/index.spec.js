const path = require('path');
const mdLinks = require('../lib/index.js').mdLinks;


const cwd = path.join(process.cwd(), '\\test\\folder');
const arrInput = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdow',
    text: 'Markdown',
    file: path.join(cwd, '\\ALGO.md'),
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: path.join(cwd, '\\ALGO.md'),
  },
  {
    href: 'https://www.laboratoria.com',
    text: 'laboratoria 1111111111111111111111111111111111111',
    file: path.join(cwd, '\\ALGO.md'),
  }];
const arrOutput = [{
  href: 'https://es.wikipedia.org/wiki/Markdow',
  text: 'Markdown',
  file: path.join(cwd, '\\ALGO.md'),
  status: 404,
  statusText: 'Fail',
},
{
  href: 'https://nodejs.org/',
  text: 'Node.js',
  file: path.join(cwd, '\\ALGO.md'),
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://www.laboratoria.com',
  text: 'laboratoria 1111111111111111111111111111111111111',
  file: path.join(cwd, '\\ALGO.md'),
  status: ':not exist',
  statusText: 'Fail',
}];

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
