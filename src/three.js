import path from 'path';
import _ from 'lodash';
import fs from 'fs';

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

const gendiff = (filepath1, filepath2) => {
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);
  const obj1 = JSON.parse(fs.readFileSync(fullPath1));
  const obj2 = JSON.parse(fs.readFileSync(fullPath2));
  const objWithType = compareAndSort(obj1, obj2);
  const stringify = formatDiff(objWithType);
  return stringify;
};
export default gendiff;
