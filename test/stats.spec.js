const getTotalLinks = require('../lib/stats.js').getTotalLinks;
const getDiferentTotalLinks = require('../lib/stats.js').getDiferentTotalLinks;

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

describe('getTotalLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof getTotalLinks).toBe('function');
  });
  it('Debería retornar un string con el total de links', () => {
    expect(getTotalLinks(arrInput)).toEqual('Total: 3');
  });
});

describe('getDiferentTotalLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof getDiferentTotalLinks).toBe('function');
  });
  it('Debería retornar un string con el total de links únicos', () => {
    expect(getDiferentTotalLinks(arrInput)).toEqual('Unique: 3');
  });
});
