import isObject from './is_object.js';

const getStateNode = (key, obj1, obj2) => {
  const existsInObj1 = Object.hasOwn(obj1, key);
  const existsInObj2 = Object.hasOwn(obj2, key);
  let result = 'remained';

  if (existsInObj1 && existsInObj2) {
    if (obj1[key] !== obj2[key]) {
      result = 'updated';
    }
  }

  if (existsInObj1 && !existsInObj2) {
    result = 'deleted';
  }

  if (!existsInObj1 && existsInObj2) {
    result = 'created';
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
      const state = getStateNode(key, obj1, obj2);
      if (state !== 'remained') {
        diff[key] = state;
      }
    }
  });

  return diff;
};

export default getDiff;
