const getString = (value) => {
  switch (typeof value) {
    case 'object':
      return value == null ? value : '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};
const data = {
  added: 'was added with value:',
  deleted: 'was removed',
  changed: 'was updated. From',
};

function getPlain(tree) {
  function iter(object, path) {
    const result = object.map((key) => {
      const fullKey = `${path}${key.key}`;
      if (key.type === 'deleted') {
        return `Property '${fullKey}' ${data.deleted}`;
      }
      if (key.type === 'added') {
        return `Property '${fullKey}' ${data.added} ${getString(key.value)}`;
      }
      if (key.type === 'nested') {
        return iter(key.children, `${fullKey}.`);
      }
      if (key.type === 'changed') {
        return `Property '${fullKey}' ${data.changed} ${getString(key.oldValue)} to ${getString(key.value)}`;
      }
      return null;
    });
    return result.filter((item) => item != null).join('\n');
  }
  return iter(tree, '');
}

export default getPlain;
