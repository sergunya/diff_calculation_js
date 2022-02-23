import _ from 'lodash';
import proccedFile from './file.js';
import parseFile from './parsers.js';

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

  return getDiff(parsedFile1, parsedFile2);
};

export default compareFiles;
