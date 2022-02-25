import _ from 'lodash';
import isObject from './is_object.js';

const stylish = (diff) => {
  const styleNode = (node, level, prevKey = null) => {
    const keys = _.sortBy(Object.keys(node));
    const indent = '  '.repeat(level);

    const result = keys.map((key) => {
      if (isObject(node[key])) {
        const childs = Object.values(node[key]).filter(isObject);

        if (childs.length === 0) {
          return styleNode(node[key], level + 1, key);
        }

        return [`${indent}    ${key} {`, ...styleNode(node[key], level + 1, key), `${indent}    }`];
      }

      return `${indent}${key} ${prevKey}: ${node[key]}`;
    });

    return result.flat();
  };

  const diffString = ['{', ...styleNode(diff, 1), '}'];

  return diffString.join('\n');
};

export default stylish;
