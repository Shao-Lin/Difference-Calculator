const stringify = (data, replacer = ' ', spacesCount = 4, level = 0) => {
  const iter = (data2, level2) => {
    if (data2 === null) {
      return 'null';
    }

    if (typeof data2 === 'boolean' || typeof data2 === 'number') {
      return String(data2);
    }

    if (typeof data2 === 'string') {
      return data2; // Чтобы строки были корректно экранированы
    }

    if (typeof data2 === 'object') {
      const keys = Object.keys(data2);
      const keyValues = keys.map((key) => {
        const keyValue = iter(data2[key], level2 + 1);
        if (keyValue !== undefined) {
          const before = replacer.repeat((level2 + 1) * spacesCount);
          return `${before}${key}: ${keyValue}`;
        }
        return '';
      }).filter((keyValue) => keyValue !== ''); // Убираем пустые строки

      const indent = replacer.repeat(level2 * spacesCount);
      return `{\n${keyValues.join('\n')}\n${indent}}`;
    }

    return undefined; // Для функций и undefined
  };

  return iter(data, level);
};

const formatDiff = (arr) => {
  const iter = (array, level = 1) => {
    const result = array.map((obj) => {
      const baseIndent = ' '.repeat(level * 4);
      const specialIndent = baseIndent.slice(2);
      const keyValue = (value) => {
        if (Array.isArray(value)) {
          return `{\n${iter(value, level + 1)}\n${baseIndent}}`;
        }
        return stringify(value, ' ', 4, level);
      };

      switch (obj.type) {
        case 'deleted':
          return `${specialIndent}- ${obj.key}: ${keyValue(obj.value)}`;
        case 'added':
          return `${specialIndent}+ ${obj.key}: ${keyValue(obj.value)}`;
        case 'changed':
          return `${specialIndent}- ${obj.key}: ${keyValue(obj.oldValue)}\n${specialIndent}+ ${obj.key}: ${keyValue(obj.value)}`;
        case 'nested':
          return `${baseIndent}${obj.key}: {\n${iter(obj.children, level + 1)}\n${baseIndent}}`;
        case 'unchanged':
          return `${baseIndent}${obj.key}: ${keyValue(obj.value)}`;
        default:
          return '';
      }
    });
    return result.join('\n');
  };

  return `{\n${iter(arr)}\n}`;
};

export default formatDiff;
