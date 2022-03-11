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

const getIndent = (level) => {
  const baseIndent = '    ';
  const indentLength = (baseIndent.length * level) - 1;

  return ' '.repeat(indentLength);
};

const formatToStylish = (diff) => {
  const styleNode = (node, level) => {
    const keys = _.sortBy(Object.keys(node));
    let indent = getIndent(level);

    const result = keys.map((key) => {
      if (!_.isObject(node[key])) {
        return `${indent} ${key}: ${node[key]}`;
      }

      if (isDiffNode(node[key])) {
        const state = STATES[node[key].state];
        const { value } = node[key];

        if (state === '±') {
          const { oldValue } = node[key];
          const formatNode = [];
          indent = getIndent(level, STATES.removed);

          if (_.isObject(oldValue)) {
            formatNode.push([`${indent}${STATES.removed} ${key}: {`, ...styleNode(oldValue, level + 1), `  ${indent}}`]);
          } else {
            formatNode.push(`${indent}${STATES.removed} ${key}: ${oldValue}`);
          }

          if (_.isObject(value)) {
            formatNode.push([`${indent}${state.added} ${key}: {`, ...styleNode(value, level + 1), `  ${indent}}`]);
          } else {
            formatNode.push(`${indent}${STATES.added} ${key}: ${value}`);
          }

          return formatNode.flat();
        }

        if (_.isObject(value)) {
          indent = getIndent(level, state);
          return [`${indent}${state} ${key}: {`, ...styleNode(value, level + 1), `  ${indent}}`];
        }

        return `${indent}${state} ${key}: ${node[key].value}`;
      }

      return [`${indent}  ${key}: {`, ...styleNode(node[key], level + 1), `  ${indent}}`];
    });

    return result.flat();
  };

  const diffString = ['{', ...styleNode(diff, 1), '}'];

  return diffString.join('\n');
};

export default formatToStylish;
