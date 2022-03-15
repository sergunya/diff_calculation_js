import parseFile from './parsers.js';
import getFormatter from './formatters/index.js';
import makeDiff from './diff.js';

const genDiff = (src1, src2, formatName) => {
  const parsedFile1 = parseFile(src1);
  const parsedFile2 = parseFile(src2);

  const diff = makeDiff(parsedFile1, parsedFile2);
  const formatter = getFormatter(formatName);

  return formatter(diff);
};

export default genDiff;
