import _ from 'lodash';

const STATES = {
  added: '+',
  removed: '-',
  updated: '±',
};

const isDiffNode = (node) => {
  if (_.has(node, 'state') && _.has(node, 'value')) {
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

const formatToStylish = (diff) => {
  const styleNode = (node, level) => {
    const keys = _.sortBy(Object.keys(node));

    const result = keys.map((key) => {
      if (!_.isObject(node[key])) {
        return `${getIndent(level)}${key}: ${node[key]}`;
      }

      if (isDiffNode(node[key])) {
        const state = STATES[node[key].state];
        const { value } = node[key];
        const indent = getIndent(level, true);

        if (state === '±') {
          const { oldValue } = node[key];
          const remPref = `${indent}${STATES.removed} ${key}:`;
          const addPref = `${indent}${STATES.added} ${key}:`;

          const result = {
            del: _.isObject(oldValue) ? [`${remPref} {`, ...styleNode(oldValue, level + 1), `  ${indent}}`] : `${remPref} ${oldValue}`,
            add: _.isObject(value) ? [`${addPref} {`, ...styleNode(value, level + 1), `  ${indent}}`] : `${addPref} ${value}`,
          }

          return [result.del, result.add].flat();
        }

        if (_.isObject(value)) {
          return [`${indent}${state} ${key}: {`, ...styleNode(value, level + 1), `  ${indent}}`];
        }

        return `${indent}${state} ${key}: ${node[key].value}`;
      }

      return [`${getIndent(level)}${key}: {`, ...styleNode(node[key], level + 1), `${getIndent(level)}}`];
    });

    return result.flat();
  };

  const diffString = ['{', ...styleNode(diff, 1), '}'];

  return diffString.join('\n');
};

export default formatToStylish;
