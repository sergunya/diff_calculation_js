import formatToPlain from './plain.js';
import formatToJSON from './json.js';
import formatToStylish from './stylish.js';

const getFormatter = (formatterName) => {
  if (formatterName === 'plain') {
    return formatToPlain;
  }

  if (formatterName === 'json') {
    return formatToJSON;
  }

  return formatToStylish;
};

const formatDiff = (diff, formatName) => getFormatter(formatName)(diff);

export default formatDiff;
