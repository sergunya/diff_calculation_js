import yaml from 'js-yaml';
import path from 'path';
import { readFileSync } from 'fs';

const getAbsoluteFilePath = (filepath) => {
  if (filepath.startsWith('.')) {
    const procDir = process.cwd();

    return path.resolve(procDir, filepath);
  }

  return path.resolve(filepath);
};

const choosParser = (extension) => {
  switch (extension) {
    case '.yml':
      return yaml.load;
    case '.yaml':
      return yaml.load;
    case '.json':
      return JSON.parse;
    default:
      throw new Error(`Parser for file extension ${extension} not found`);
  }
};

const parseFile = (filepath) => {
  const absolutePath = getAbsoluteFilePath(filepath);
  const content = readFileSync(absolutePath, { encoding: 'utf8', flag: 'r' });

  const parse = choosParser(path.extname(absolutePath));

  return parse(content);
};

export default parseFile;
