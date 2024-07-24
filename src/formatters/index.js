import formatDiff from './stylish.js';
import getPlain from './plain.js';

const makeFormat = (objWithType, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatDiff(objWithType);
    case 'plain':
      return getPlain(objWithType);
    case 'JSON':
      return JSON.stringify(objWithType);
    default:
      throw new Error('Output format is not correct');
  }
};
export default makeFormat;
