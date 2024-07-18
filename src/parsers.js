import yaml from 'js-yaml';

const parseFile = (fullPath, extention) => {
  switch (extention) {
    case 'json':
      return JSON.parse(fullPath);
    case 'yml':
    case 'yaml':
      return yaml.load(fullPath);
    default:
      throw new Error('The extension is not supported');
  }
};
export default parseFile;
