const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);
const path = require("path");

const dirPrefix = "../api-sample-res";

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  return mkdirAsync(dirname, { recursive: true });
}

async function createFile(filePath, data) {
  let jsonData = JSON.stringify(data, null, 2);
  await ensureDirectoryExistence(filePath);
  return writeFileAsync(filePath, jsonData);
}

function generateData(noOfItems, idPrefix, namePrefix, itemMeta, itemData) {
  return new Array(noOfItems).fill(0).map((_, i) => ({
    data: {
      id: `${idPrefix}${i + 1}`,
      name: `${namePrefix} ${i + 1}`,
      ...itemData,
    },
    meta: itemMeta,
  }));
}

async function generateFile({
  noOfItems,
  filePath,
  idPrefix,
  namePrefix,
  meta,
  itemMeta,
  itemData,
  isDetail,
}) {
  try {
    const data = generateData(
      noOfItems,
      idPrefix,
      namePrefix,
      itemMeta,
      itemData
    );
    let fileData = { data, meta };
    if (isDetail) {
      fileData = data[0];
    }
    await createFile(filePath, fileData);
  } catch (error) {
    console.log("generateFile:ERROR");
    console.log(error);
  }
}

module.exports = {
  ensureDirectoryExistence,
  createFile,
  generateData,
  generateFile,
  dirPrefix,
};
