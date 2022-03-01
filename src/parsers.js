import yaml from 'js-yaml';

const choosParser = (extension) => {
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load;
  }

  return JSON.parse;
};

const parseFile = (data, extension) => {
  const parse = choosParser(extension);

  return parse(data);
};

export default parseFile;
