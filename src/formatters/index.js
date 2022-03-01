import formatToPlain from './plain.js';
import formatToJSON from './json.js';
import formatToStylish from './stylish.js';

const getFormatter = (formatterName) => {
  if (formatterName === 'plain') {
    return formatToPlain;
  }

  if (formatterName === 'stylish') {
    return formatToStylish;
  }

  if (formatterName === 'json') {
    return formatToJSON;
  }

  return null;
};

export default getFormatter;
