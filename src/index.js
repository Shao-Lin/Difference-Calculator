import { formatDiff, compareAndSort, readFile, getExtention } from './utils.js';
import parseFile from './parsers.js';

const gendiff = (filepath1, filepath2) => {
  const readFile1 = readFile(filepath1);
  const readFile2 = readFile(filepath2);
  const extention1 = getExtention(filepath1);
  const extension2 = getExtention(filepath2);
  const obj1 = parseFile(readFile1, extention1);
  const obj2 = parseFile(readFile2, extension2);
  const objWithType = compareAndSort(obj1, obj2);
  const stringify = formatDiff(objWithType);
  return stringify;
};
export default gendiff;
