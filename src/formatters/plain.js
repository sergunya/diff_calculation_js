import _ from 'lodash';

const valueToString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const getPath = (parentPath, key) => (parentPath.length === 0 ? key : `${parentPath.join('.')}.${key}`);

const formatToPlain = (diff) => {
  const styleNode = (node, parentPath) => {
    const result = _.sortBy(node, 'key').map((item) => {
      const baseMessage = `Property '${getPath(parentPath, item.key)}' was`;
      const value = valueToString(item.value);

      if (item.state === 'updated') {
        const oldValue = valueToString(item.oldValue);
        return `${baseMessage} updated. From ${oldValue} to ${value}\n`;
      }

      if (item.state === 'added') {
        return `${baseMessage} added with value: ${value}\n`;
      }

      if (item.state === 'removed') {
        return `${baseMessage} removed`;
      }

      return styleNode(item.children, [...parentPath, item.key]);
    });

    return result.flat();
  };

  const diffString = [...styleNode(diff, [])];

  return diffString.join('').trimEnd();
};

export default formatToPlain;
