import _ from 'lodash';

const makeDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = [...new Set([...keys1, ...keys2])];

  return allKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, children: makeDiff(obj1[key], obj2[key]) };
    }
    const existsInObj1 = _.has(obj1, key);
    const existsInObj2 = _.has(obj2, key);

    if (existsInObj1 && existsInObj2) {
      if (obj1[key] !== obj2[key]) {
        return {
          key, value: obj2[key], state: 'updated', oldValue: obj1[key],
        };
      }
    }

    if (existsInObj1 && !existsInObj2) {
      return { key, state: 'removed', value: obj1[key] };
    }

    if (!existsInObj1 && existsInObj2) {
      return { key, state: 'added', value: obj2[key] };
    }

    return { key, value: obj2[key] };
  });
};

export default makeDiff;
