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
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load;
  }

  return JSON.parse;
};

const parseFile = (filepath) => {
  const absolutePath = getAbsoluteFilePath(filepath);
  const content = readFileSync(absolutePath, { encoding: 'utf8', flag: 'r' });

  const parse = choosParser(path.extname(absolutePath));

  return parse(content);
};

export default parseFile;
