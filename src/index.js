import _ from 'lodash';
import proccedFile from './file.js';
import parseFile from './parsers.js';

const isObject = (obj) => {
  if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
    return true;
  }

  return false;
};

const stateOfValue = (key, obj1, obj2) => {
  const existsInObj1 = Object.hasOwn(obj1, key);
  const existsInObj2 = Object.hasOwn(obj2, key);
  let state = 'remained';

  if (existsInObj1 && existsInObj2 && obj1[key] !== obj2[key]) {
    state = 'updated';
  }

  if (existsInObj1 && !existsInObj2) {
    state = 'deleted';
  }

  if (!existsInObj1 && existsInObj2) {
    state = 'added';
  }

  return state;
};

const getDiff2 = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = [...new Set([...keys1, ...keys2])];
  const diff = {};

  allKeys.forEach((key) => {
    if (isObject(obj2[key]) && isObject(obj1[key])) {
      diff[key] = getDiff2(obj1[key], obj2[key]);
    } else {
      diff[key] = stateOfValue(key, obj1, obj2);
    }
  });

  return diff;
};

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.sortBy([...new Set([...keys1, ...keys2])]);
  const result = [];

  allKeys.forEach((key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      if (obj1[key] === obj2[key]) {
        result.push(`    ${key}: ${obj2[key]}`);
      } else {
        result.push(`  - ${key}: ${obj1[key]}`);
        result.push(`  + ${key}: ${obj2[key]}`);
      }
    }

    if (keys1.includes(key) && !keys2.includes(key)) {
      result.push(`  - ${key}: ${obj1[key]}`);
    }

    if (!keys1.includes(key) && keys2.includes(key)) {
      result.push(`  + ${key}: ${obj2[key]}`);
    }
  });

  return ['{', ...result, '}'].join('\n');
};

const compareFiles = (src1, src2) => {
  const file1 = proccedFile(src1);
  const file2 = proccedFile(src2);

  const parsedFile1 = parseFile(file1.data, file1.extenstion);
  const parsedFile2 = parseFile(file2.data, file2.extenstion);

  console.log(JSON.stringify(getDiff2(parsedFile1, parsedFile2)));
  return getDiff(parsedFile1, parsedFile2);
};

export default compareFiles;
