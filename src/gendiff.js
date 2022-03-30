import path from 'path';
import { readFileSync } from 'fs';
import parseFile from './parsers.js';
import formatDiff from './formatters/index.js';
import makeDiff from './diff.js';

const getAbsoluteFilePath = (filepath) => path.resolve(process.cwd(), filepath);

const getExtension = (filepath) => path.extname(filepath).slice(1);

const readFile = (filepath) => readFileSync(filepath, { encoding: 'utf8', flag: 'r' });

const genDiff = (src1, src2, formatName = 'stylish') => {
  const path1 = getAbsoluteFilePath(src1);
  const path2 = getAbsoluteFilePath(src2);
  const ext1 = getExtension(path1);
  const ext2 = getExtension(path2);
  const data1 = readFile(path1);
  const data2 = readFile(path2);
  const parsedFile1 = parseFile(data1, ext1);
  const parsedFile2 = parseFile(data2, ext2);

  const diff = makeDiff(parsedFile1, parsedFile2);

  return formatDiff(diff, formatName);
};

export default genDiff;
