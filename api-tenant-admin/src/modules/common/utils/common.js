const isNotEmptyArr = (arr) => arr && arr.length > 0;
const isNotEmptyObj = (obj) => obj && Object.keys(obj).length > 0;
const isNotEmptyStr = (str) => isNotEmptyArr(str.trim());
const isNotEmptyNo = (number) => number || number === 0;

function isNotEmpty(val) {
  if (Array.isArray(val)) return isNotEmptyArr(val);
  if (typeof val == "object") return isNotEmptyObj(val);
  if (typeof val == "string") return isNotEmptyStr(val);
  if (typeof val == "number") return isNotEmptyNo(val);
  return val;
}

module.exports = {
  isNotEmpty,
};
