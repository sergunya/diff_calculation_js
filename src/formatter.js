import _ from 'lodash';
import isObject from './is_object.js';

const STATES = {
  created: '+',
  deleted: '-',
  updated: '±',
  remained: ' ',
};

const isDiffNode = (node) => {
  if (Object.hasOwn(node, 'state') && Object.hasOwn(node, 'value')) {
    return true;
  }

  return false;
};

const stylish = (diff) => {
  const styleNode = (node, level) => {
    const keys = _.sortBy(Object.keys(node));
    const indent = '  '.repeat(level);

    const result = keys.map((key) => {
      if (!isObject(node[key])) {
        return `${indent}${key}: ${node[key]}`;
      }

      if (isDiffNode(node[key])) {
        const state = STATES[node[key].state];
        const { value } = node[key];

        if (state === '±') {
          const { oldValue } = node[key];
          const formatNode = [];

          if (isObject(oldValue)) {
            formatNode.push([`${indent}${STATES.deleted} ${key}: {`, ...styleNode(oldValue, level + 1), `${indent}}`]);
          } else {
            formatNode.push(`${indent}${STATES.deleted} ${key}: ${oldValue}`);
          }

          if (isObject(value)) {
            formatNode.push([`${indent}${state} ${key}: {`, ...styleNode(value, level + 1), `${indent}}`]);
          } else {
            formatNode.push(`${indent}${STATES.created} ${key}: ${value}`);
          }

          return formatNode.flat();
        }

        if (isObject(value)) {
          return [`${indent}${state} ${key}: {`, ...styleNode(value, level + 1), `${indent}}`];
        }

        return `${indent}${state} ${key}: ${node[key].value}`;
      }

      return [`${indent}${key}: {`, ...styleNode(node[key], level + 1), `${indent}}`];
    });

    return result.flat();
  };

  const diffString = ['{', ...styleNode(diff, 1), '}'];

  return diffString.join('\n');
};

export default stylish;
