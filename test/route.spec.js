const isValidRoute = require('../lib/links.js').isValidRoute;
const itsAbsolute = require('../lib/links.js').itsAbsolute;
const changeToAbsolute = require('../lib/links.js').changeToAbsolute;
const isFilePath = require('../lib/links.js').isFilePath;
const getFiles = require('../lib/links.js').getFiles;
const searchFilesMd = require('../lib/links.js').searchFilesMd;
const getContent = require('../lib/links.js').getContent;
const getLinks = require('../lib/links.js').getLinks;
const validateLinks = require('../lib/links.js').validateLinks;

// example case
const cwd = process.cwd().concat('\\test');
const route = 'test\\folder\\exampe1.txt';
const arrInput = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdow',
    text: 'Markdown',
    file: cwd,
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: cwd,
  },
  {
    href: 'https://laboratoria.com',
    text: 'laboratoria 1111111111111111111111111111111111111',
    file: cwd,
  }];
const arrOutput = [{
  href: 'https://es.wikipedia.org/wiki/Markdow',
  text: 'Markdown',
  file: cwd,
  status: 404,
  statusText: 'Fail',
},
{
  href: 'https://nodejs.org/',
  text: 'Node.js',
  file: cwd,
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://laboratoria.com',
  text: 'laboratoria 1111111111111111111111111111111111111',
  file: cwd,
  status: ':not exist',
  statusText: 'Fail',
}];


describe('isValidRoute', () => {
  it('Debería ser una función', () => {
    expect(typeof isValidRoute).toBe('function');
  });
  it('Debería retornar true si es la ruta es válida', () => {
    expect(isValidRoute(cwd)).toBe(true);
  });
  it('Debería retornar false si es la ruta no es válida', () => {
    expect(isValidRoute('C:\\cualquiercosa')).toBe(false);
  });
});

describe('itsAbsolute', () => {
  it('debería ser una función', () => {
    expect(typeof itsAbsolute).toBe('function');
  });
  it('Debería retornar un booleano', () => {
    const resultemp = itsAbsolute(route);
    expect(typeof resultemp).toEqual('boolean');
    expect(resultemp).toBe(false);
  });
  it('Debería retornar true para la ruta absoluta', () => {
    const resultemp2 = itsAbsolute(cwd);
    expect(resultemp2).toBe(true);
  });
});

describe('changeToAbsolute', () => {
  it('debería ser una función', () => {
    expect(typeof changeToAbsolute).toBe('function');
  });
  it('Debería retornar una ruta absoluta', () => {
    const salid = changeToAbsolute(route);
    const routeabs = cwd.concat('\\folder\\exampe1.txt');
    expect(salid).toBe(routeabs);
  });
});

describe('isFilePath', () => {
  it('debería ser una función', () => {
    expect(typeof isFilePath).toBe('function');
  });
  it('Debería retornar true porque es una ruta de archivo', () => {
    const routeabs = cwd.concat('\\folder\\exampe1.txt');
    const resultemp = isFilePath(routeabs);
    expect(resultemp).toBe(true);
  });
});

describe('getFiles', () => {
  it('debería ser una función', () => {
    expect(typeof getFiles).toBe('function');
  });
  it('Debería recibir la ruta de un archivo y devolver un array con la ruta del archivo', () => {
    const routeE = cwd.concat('\\folder');
    expect(getFiles(routeE)).toEqual([routeE.concat('\\ALGO.md'), 'C:\\Users\\User\\Desktop\\LIM010-fe-md-links\\test\\folder\\exampe1.txt']);
  });
});

describe('searchFilesMd', () => {
  it('Debería ser una función', () => {
    expect(typeof searchFilesMd).toBe('function');
  });
  it('Debería recibir un array de rutas de archivos y obtener solo los archivos .md', () => {
    expect(searchFilesMd(getFiles(cwd))).toEqual([cwd.concat('\\folder\\ALGO.md')]);
  });
});

describe('getContent', () => {
  it('Debería ser una función', () => {
    expect(typeof getContent).toBe('function');
  });
  it('Debería extraer contenido del archivo md y devolverlo como string', () => {
    const arr = searchFilesMd(getFiles(cwd));
    expect(getContent(arr[0])).toBe('[Markdown](https://es.wikipedia.org/wiki/Markdow).[Node.js](https://nodejs.org/). mas informacion en [laboratoria 111111111111111111111111111111111111111111111111111](https://www.laboratoria.com).');
  });
});

describe('getLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof getLinks).toBe('function');
  });
  it('Debería devolver un array de objetos(href, text, file)', () => {
    const routeabs = cwd.concat('\\folder\\ALGO.md');
    expect(getLinks(routeabs, getContent(routeabs))).toEqual([{ file: cwd.concat('\\folder\\ALGO.md'), href: 'https://es.wikipedia.org/wiki/Markdow', text: 'Markdown' }, { file: cwd.concat('\\folder\\ALGO.md'), href: 'https://nodejs.org/', text: 'Node.js' }, { file: cwd.concat('\\folder\\ALGO.md'), href: 'https://www.laboratoria.com', text: 'laboratoria 1111111111111111111111111111111111111' }]);
  });
});

describe('validateLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('Debería retornar el array de links con el estado', done => validateLinks(arrInput)
    .then((res) => {
      expect(res).toEqual(arrOutput);
      done();
    }));
});
