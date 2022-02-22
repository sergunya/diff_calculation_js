import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const mergedObject = { ...obj1, ...obj2 };
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.sortBy(Object.keys(mergedObject));
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

const getUnifiedFilePath = (filepath) => {
  if (filepath.startsWith('.')) {
    const procDir = process.cwd();

    return path.resolve(procDir, filepath);
  }

  return path.resolve(filepath);
};

const getFileContent = (filepath) => {
  const content = readFileSync(
    getUnifiedFilePath(filepath),
    { encoding: 'utf8', flag: 'r' },
  );

  return JSON.parse(content);
};

const compareObjects = (src1, src2) => {
  const content1 = getFileContent(src1);
  const content2 = getFileContent(src2);
  return getDiff(content1, content2);
};

export default compareObjects;
