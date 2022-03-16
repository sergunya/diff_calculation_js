import _ from 'lodash';

const STATES = {
  added: '+',
  removed: '-',
};

const isDiffNode = (node) => {
  if (_.has(node, 'state') && ['added', 'removed', 'updated'].includes(node.state)) {
    return true;
  }

  return false;
};

const getIndent = (level, sign = false) => {
  const baseIndent = 4;
  const signSpaces = 2;
  const indent = (baseIndent * level);

  if (sign === false) {
    return ' '.repeat(indent);
  }

  return ' '.repeat(indent - signSpaces);
};

const stringify = (obj, level) => {
  const indent = getIndent(level + 1);
  return _.sortBy(Object.keys(obj)).map((key) => {
    if (_.isObject(obj[key])) {
      return [`${indent}${key}: {`, ...stringify(obj[key], level + 1), `${indent}}`].flat();
    }

    return `${indent}${key}: ${obj[key]}`;
  }).flat();
};

const formatToStylish = (diff) => {
  const styleNode = (node, level) => {
    const res = _.sortBy(node, 'key').map((item) => {
      const indent = getIndent(level);

      if (_.has(item, 'children')) {
        return [`${indent}${item.key}: {`, ...styleNode(item.children, level + 1), `${indent}}`].join('\n');
      }

      const value = _.isObject(item.value) ? ['{', ...stringify(item.value, level), `${indent}}`].join('\n') : item.value;

      if (isDiffNode(item)) {
        const signIndent = getIndent(level, true);

        if (item.state === 'updated') {
          const oldValue = _.isObject(item.oldValue) ? ['{', stringify(item.oldValue, level), `${indent}}`].join('\n') : item.oldValue;
          const del = `${signIndent}${STATES.removed} ${item.key}: ${oldValue}`;
          const add = `${signIndent}${STATES.added} ${item.key}: ${value}`;

          return [del, add].join('\n');
        }

        return `${signIndent}${STATES[item.state]} ${item.key}: ${value}`;
      }

      return `${indent}${item.key}: ${value}`;
    });

    return res;
  };

  const diffString = ['{', ...styleNode(diff, 1), '}'];

  return diffString.join('\n');
};

export default formatToStylish;
