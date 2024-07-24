import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const getExtention = (filename) => {
  const splitName = filename.split('.');
  const extention = splitName.slice(-1);
  const result = extention[0];
  return result;
};
const readFile = (filePath) => {
  const dirName = process.cwd(filePath);
  const fullPath = path.resolve(dirName, filePath);
  return fs.readFileSync(fullPath, 'utf-8');
};

const compareAndSort = (obj1, obj2) => {
  const iter = (o1, o2, level) => {
    const unionObj = { ...o1, ...o2 };
    const sortedKeys = _.sortBy(Object.keys(unionObj));

    const arr = sortedKeys.map((key) => {
      const obj = { key, level };
      if (Object.hasOwn(o1, key) && !Object.hasOwn(o2, key)) {
        obj.type = 'deleted';
        obj.value = o1[key];
      } else if (!Object.hasOwn(o1, key) && Object.hasOwn(o2, key)) {
        obj.type = 'added';
        obj.value = o2[key];
      } else if (
        typeof o1[key] === 'object' &&
        typeof o2[key] === 'object' &&
        o1[key] !== null &&
        o2[key] !== null
      ) {
        obj.type = 'nested';
        obj.children = iter(o1[key], o2[key], level + 1);
      } else if (o1[key] !== o2[key]) {
        obj.type = 'changed';
        obj.oldValue = o1[key];
        obj.value = o2[key];
      } else {
        obj.type = 'unchanged';
        obj.value = o1[key];
      }
      return obj;
    });
    return arr;
  };
  return iter(obj1, obj2, 1);
};

export { compareAndSort, getExtention, readFile };
