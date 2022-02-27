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

const getIndent = (level, state = ' ') => {
  const baseIndent = '    ';
  const indentLength = (baseIndent.length * level) - state.length;

  return ' '.repeat(indentLength);
};

const stylish = (diff) => {
  const styleNode = (node, level) => {
    const keys = _.sortBy(Object.keys(node));
    let indent = getIndent(level);

    const result = keys.map((key) => {
      if (!isObject(node[key])) {
        return `${indent} ${key}: ${node[key]}`;
      }

      if (isDiffNode(node[key])) {
        const state = STATES[node[key].state];
        const { value } = node[key];

        if (state === '±') {
          const { oldValue } = node[key];
          const formatNode = [];
          indent = getIndent(level, STATES.deleted);

          if (isObject(oldValue)) {
            formatNode.push([`${indent}${STATES.deleted} ${key}: {`, ...styleNode(oldValue, level + 1), `  ${indent}}`]);
          } else {
            formatNode.push(`${indent}${STATES.deleted} ${key}: ${oldValue}`);
          }

          if (isObject(value)) {
            formatNode.push([`${indent}${state.created} ${key}: {`, ...styleNode(value, level + 1), `  ${indent}}`]);
          } else {
            formatNode.push(`${indent}${STATES.created} ${key}: ${value}`);
          }

          return formatNode.flat();
        }
        
        if (isObject(value)) {          
          indent = getIndent(level, state);
          return [`${indent}${state} ${key}: {`, ...styleNode(value, level + 1), `  ${indent}}`];
        }
        
        return `${indent}${state} ${key}: ${node[key].value}`;
      }
      
      return [`${indent}${STATES.remained} ${key}: {`, ...styleNode(node[key], level + 1), `  ${indent}}`];
    });

    return result.flat();
  };

  const diffString = ['{', ...styleNode(diff, 1), '}'];

  return diffString.join('\n');
};

export default stylish;
