import _ from 'lodash';
import isObject from './is_object.js';

const stateToString = (state) => {
  let printState = '';

  if (state === 'created') {
    printState = '+';
  }

  if (state === 'deleted') {
    printState = '-';
  }

  if (state === 'updated') {
    printState = '±';
  }

  return printState;
};

const getIndent = (level) => {
  const baseIndent = '    ';
  const indentLength = (baseIndent.length * level) - 1;

  return ' '.repeat(indentLength);
};

const stylish = (diff, obj1, obj2) => {
  const mergedObject = { ...obj1, ...obj2 };


  const styleNode = (node, level, parentPath) => {
    const keys = _.sortBy(Object.keys(node));
    const indent = getIndent(level);

    const result = keys.map((key) => {
      const diffKey = _.get(diff, [...parentPath, key]);
      const printKey = diffKey === undefined ? '' : stateToString(diffKey);

      if (!isObject(node[key])) {
        const diffStrings = [];

        if (printKey === '±') {
          diffStrings.push(`${indent} ${stateToString('created')} ${key}: ${node[key]}`)
          diffStrings.push(`${indent} ${stateToString('deleted')} ${key}: ${node[key]}`)
        } else {
          diffStrings.push(`${indent} ${printKey} ${key}: ${node[key]}`)
        }

        return diffStrings.join('\n');
      }

      return [`${indent} ${printKey} ${key}: {`, ...styleNode(node[key], level + 1, [...parentPath, key]), `  ${indent}}`];
    });

    return result.flat();
  };

  const diffString = ['{', ...styleNode(mergedObject, 1, []), '}'];

  return diffString.join('\n');
};

export default stylish;
