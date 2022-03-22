import parseFile from './parsers.js';
import getFormatter from './formatters/index.js';
import makeDiff from './diff.js';
import { getAbsoluteFilePath, getExtension, readFile } from './index.js';

const genDiff = (src1, src2, formatName) => {
  const path1 = getAbsoluteFilePath(src1);
  const path2 = getAbsoluteFilePath(src2);
  const ext1 = getExtension(path1);
  const ext2 = getExtension(path2);
  const data1 = readFile(path1);
  const data2 = readFile(path2);
  const parsedFile1 = parseFile(data1, ext1);
  const parsedFile2 = parseFile(data2, ext2);

  const diff = makeDiff(parsedFile1, parsedFile2);
  const formatter = getFormatter(formatName);

  return formatter(diff);
};

export default genDiff;
