import _ from 'lodash';
import isObject from './is_object.js';
import { makeDiffNode } from './diff_node.js';

const toString = (key, node, indent) => {
  let result;

  if (node.type === 'updated') {
    result = [`${indent}- ${key}: ${node.oldValue}`, `${indent}+ ${key}: ${node.value}`];
  }

  if (node.type === 'deleted') {
    result = [`${indent}- ${key}: ${node.value}`];
  }

  if (node.type === 'created') {
    result = [`${indent}+ ${key}: ${node.value}`];
  }

  if (node.type === 'remained') {
    result = [`${indent}  ${key}: ${node.value}`];
  }

  return result;
};

const stylish = (diff) => {
    
// const styleNode = (node, level) => {
  //     const keys = _.sortBy(Object.keys(node));
  //     const indent = '  '.repeat(level);

  //     const result = keys.map((key) => {

  //         if (!isObject(node[key])) {
  //             return `${indent}${key}: ${node[key]}`;
  //         }

  //         if (Object.hasOwn(node[key], 'value') && !isObject(node[key].value)) {
  //             return toString(key, node[key], indent);
  //         }

  //         if (Object.hasOwn(node[key], 'value') && !isObject(node[key].value)) {
  //             return toString(key, node[key], indent);
  //         }

  //         return [`${indent}${key}: {`, ...styleNode(node[key], level + 1), `${indent}}`];

  //     });

  //     return result.flat();
  // };

  // const diffString = ['{', ...styleNode(diff, 1), '}'];

  // return diffString.join('\n');

  '';
};

export default stylish;
