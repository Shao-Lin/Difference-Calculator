import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const getExtention = (filename) => {
  const splitName = filename.split('.');
  const extention = splitName.slice(-1);
  const result = extention[0];
  return result;
};
const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const stringContentOfTheFile = fs.readFileSync(fullPath, 'utf-8');
  return stringContentOfTheFile;
};

const compareAndSort = (obj1, obj2) => {
  const iter = (o1, o2, level) => {
    const unionObj = { ...o1, ...o2 };
    const sortedKeys = _.sortBy(Object.keys(unionObj));

    const arr = sortedKeys.map((key) => {
      const obj = { key, value: unionObj[key], level };
      if (Object.hasOwn(o1, key) && !Object.hasOwn(o2, key)) {
        obj.type = 'deleted';
      } else if (!Object.hasOwn(o1, key) && Object.hasOwn(o2, key)) {
        obj.type = 'added';
      } else if (
        typeof o1[key] === 'object' &&
        typeof o2[key] === 'object' &&
        o1[key] !== null &&
        o2[key] !== null
      ) {
        obj.type = 'unchanged';
        obj.value = iter(o1[key], o2[key], level + 1);
      } else if (o1[key] !== o2[key]) {
        obj.type = 'changed';
        obj.oldValue = o1[key];
      } else {
        obj.type = 'unchanged';
      }
      return obj;
    });
    return arr;
  };
  return iter(obj1, obj2, 1);
};

export { compareAndSort, getExtention, readFile };
