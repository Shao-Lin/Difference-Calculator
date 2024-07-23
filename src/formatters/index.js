import formatDiff from './stylish.js';

export default makeFormat = (objWithType, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return formatDiff(objWithType);
    default:
      throw new Error('Output format is not correct');
  }
};
