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
  const result = fs.readFileSync(fullPath, 'utf-8');
  return result;
};

const compareAndSort = (obj1, obj2) => {
  const unionObj = { ...obj1, ...obj2 };
  const sortedKeys = _.sortBy(Object.keys(unionObj));

  const arr = sortedKeys.map((key) => {
    const obj = { key, value: unionObj[key] };
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      obj.type = 'deleted';
    } else if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      obj.type = 'added';
    } else if (obj1[key] !== obj2[key]) {
      obj.type = 'changed';
      obj.oldValue = obj1[key];
    } else {
      obj.type = 'unchanged';
    }
    return obj;
  });
  return arr;
};

const formatDiff = (arr) => {
  const result = arr
    .map((obj) => {
      switch (obj.type) {
        case 'deleted':
          return `  - ${obj.key}: ${obj.value}`;
        case 'added':
          return `  + ${obj.key}: ${obj.value}`;
        case 'changed':
          return `  - ${obj.key}: ${obj.oldValue}\n  + ${obj.key}: ${obj.value}`;
        case 'unchanged':
          return `    ${obj.key}: ${obj.value}`;
        default:
          return '';
      }
    })
    .join('\n');
  return `{\n${result}\n}`;
};

export { compareAndSort, formatDiff, getExtention, readFile };
