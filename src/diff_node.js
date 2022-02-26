import isObject from './is_object.js';

export const makeDiffNode = (key, state = null) => ([state, key, 'diff_node']);

export const getDiffNodeState = (node) => node[0];

export const getDiffNodeKey = (node) => node[1];

export const printDiffNode

export const isDiffNode = (node) => {
  if (Array.isArray(node) && node[2] === 'diff_node') {
    return true;
  }

  return false;
};
