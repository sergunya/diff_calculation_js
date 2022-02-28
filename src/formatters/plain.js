import _ from 'lodash';
import isObject from '../is_object.js';

const valueToString = (value) => (isObject(value) ? '[complex_value]' : value);

const plain = (diff) => {
  const styleNode = (node, parentPath) => {
    const keys = _.sortBy(Object.keys(node));

    const result = keys
      .filter((key) => isObject(node[key]))
      .map((key) => {
        if (Object.hasOwn(node[key], 'state')) {
          const currentDiff = [`Property '${parentPath.join('.')}.${key}' was ${node[key].state}`];
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

export default plain;
