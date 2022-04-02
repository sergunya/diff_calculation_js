import formatToPlain from './plain.js';
import formatToJSON from './json.js';
import formatToStylish from './stylish.js';

const getFormatter = (formatterName) => {
  switch (formatterName) {
    case 'plain':
      return formatToPlain;
    case 'json':
      return formatToJSON;
    default:
      return formatToStylish;
  }
};

const formatDiff = (diff, formatName) => getFormatter(formatName)(diff);

export default formatDiff;
