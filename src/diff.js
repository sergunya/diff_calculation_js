import proccedFile from './file.js';
import parseFile from './parsers.js';
import isObject from './is_object.js';

const constructDiffNode = (key, obj1, obj2) => {
  const existsInObj1 = Object.hasOwn(obj1, key);
  const existsInObj2 = Object.hasOwn(obj2, key);
  let result = obj2[key];

  if (existsInObj1 && existsInObj2) {
    if (obj1[key] !== obj2[key]) {
      result = { value: obj2[key], state: 'updated', oldValue: obj1[key] };
    }
  }

  if (existsInObj1 && !existsInObj2) {
    result = { state: 'removed', value: obj1[key] };
  }

  if (!existsInObj1 && existsInObj2) {
    result = { state: 'added', value: obj2[key] };
  }

  return result;
};

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = [...new Set([...keys1, ...keys2])];
  const diff = {};

  allKeys.forEach((key) => {
    if (isObject(obj2[key]) && isObject(obj1[key])) {
      diff[key] = getDiff(obj1[key], obj2[key]);
    } else {
      diff[key] = constructDiffNode(key, obj1, obj2);
    }
  });

  return diff;
};

const genDiff = (src1, src2, format) => {
  const file1 = proccedFile(src1);
  const file2 = proccedFile(src2);

  const parsedFile1 = parseFile(file1.data, file1.extenstion);
  const parsedFile2 = parseFile(file2.data, file2.extenstion);

  return getDiff(parsedFile1, parsedFile2);
};

export default genDiff;
