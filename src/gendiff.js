import _ from 'lodash';
import parseFile from './parsers.js';
import getFormatter from './formatters/index.js';

const areObjects = (obj1, obj2) => (_.isObject(obj2) && _.isObject(obj1));

const buildDiffNode = (key, obj1, obj2) => {
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
    const val1 = obj1[key];
    const val2 = obj2[key];
    diff[key] = areObjects(val1, val2) ? makeDiff(val1, val2) : buildDiffNode(key, obj1, obj2);
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
