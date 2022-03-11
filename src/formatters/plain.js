import _ from 'lodash';

const valueToString = (value) => (_.isObject(value) ? '[complex_value]' : value);

const getPath = (parentPath, key) => {
  if (parentPath.length === 0) {
    return key;
  }

  return `${parentPath.join('.')}.${key}`;
};

const formatToPlain = (diff) => {
  const styleNode = (node, parentPath) => {
    const keys = _.sortBy(Object.keys(node));

    const result = keys
      .filter((key) => _.isObject(node[key]))
      .map((key) => {
        if (_.has(node[key], 'state')) {
          const currentDiff = [`Property '${getPath(parentPath, key)}' was ${node[key].state}`];
          const value = valueToString(node[key].value);
          const { state } = node[key];

          if (state === 'updated') {
            const oldValue = valueToString(node[key].oldValue);
            currentDiff.push(`. From ${oldValue} to ${value}`);
          }

          if (state === 'added') {
            currentDiff.push(` with value: ${value}`);
          }

          currentDiff.push('\n');

          return currentDiff.join('');
        }

        return styleNode(node[key], [...parentPath, key]);
      });

    return result.flat();
  };

  const diffString = [...styleNode(diff, [])];

  return diffString.join('');
};

export default formatToPlain;
