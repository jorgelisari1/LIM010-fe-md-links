const getTotalLinks = (arrLinks) => {
  const totalLinks = arrLinks.length;
  return `Total: ${totalLinks}`;
};

const getDiferentTotalLinks = (arrLinks) => {
  const diferentLinks = [...new Set(arrLinks.map(elem => elem.href))].length;
  return `Unique: ${diferentLinks}`;
};

module.exports = { getTotalLinks, getDiferentTotalLinks };
