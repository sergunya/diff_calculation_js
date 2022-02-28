import yaml from 'js-yaml';
import proccedFile from './file.js';

const parse = (data, extension) => {
  let result;

  if (extension === '.json') {
    result = JSON.parse(data);
  }

  if (extension === '.yml' || extension === '.yaml') {
    result = yaml.load(data);
  }

  return result;
};

const parseFile = (filepath) => {
  const file = proccedFile(filepath);
  const parsedFile = parse(file.data, file.extenstion);

  return parsedFile;
};

export default parseFile;
