import yaml from 'js-yaml';

const choosParser = (extension) => {
  switch (extension) {
    case 'yml':
      return yaml.load;
    case 'yaml':
      return yaml.load;
    case 'json':
      return JSON.parse;
    default:
      throw new Error(`Parser for file extension ${extension} not found`);
  }
};

const parseFile = (data, extension) => {
  const parse = choosParser(extension);

  return parse(data);
};

export default parseFile;
