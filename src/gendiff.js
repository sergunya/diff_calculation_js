import _ from 'lodash';
import parseFile from './parsers.js';
import getFormatter from './formatters/index.js';

const constructDiffNode = (key, obj1, obj2) => {
  const existsInObj1 = _.has(obj1, key);
  const existsInObj2 = _.has(obj2, key);

  if (existsInObj1 && existsInObj2) {
    if (obj1[key] !== obj2[key]) {
      return { value: obj2[key], state: 'updated', oldValue: obj1[key] };
    }
  }

  if (existsInObj1 && !existsInObj2) {
    return { state: 'removed', value: obj1[key] };
  }

  if (!existsInObj1 && existsInObj2) {
    return { state: 'added', value: obj2[key] };
  }

  return obj2[key];
};

const makeDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = [...new Set([...keys1, ...keys2])];
  const diff = {};

  allKeys.forEach((key) => {
    if (_.isObject(obj2[key]) && _.isObject(obj1[key])) {
      diff[key] = makeDiff(obj1[key], obj2[key]);
    } else {
      diff[key] = constructDiffNode(key, obj1, obj2);
    }
  });

  return diff;
};

const genDiff = (src1, src2, formatName) => {
  const parsedFile1 = parseFile(src1);
  const parsedFile2 = parseFile(src2);

  const diff = makeDiff(parsedFile1, parsedFile2);
  const formatter = getFormatter(formatName);

  return formatter(diff);
};

export default genDiff;
