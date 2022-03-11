import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathToFile = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

describe('test plain formatter for JSON and YAML files', () => {
  test.each([
    { a: 'not_flat_json_1.json', b: 'not_flat_json_2.json', expected: 'Property \'common.follow\' was added with value: false' },
    { a: 'not_flat_json_1.json', b: 'not_flat_json_2.json', expected: 'Property \'common.setting3\' was updated. From true to null' },
    { a: 'not_flat_json_1.json', b: 'not_flat_json_2.json', expected: 'Property \'group2\' was removed' },
    { a: 'not_flat_json_1.json', b: 'not_flat_json_2.json', expected: 'Property \'group3\' was added with value: [complex value]' },
    { a: 'not_flat_yaml_1.yml', b: 'not_flat_yaml_2.yaml', expected: 'Property \'calling-birds\' was updated. From \'huey\' to \'fred\'' },
    { a: 'not_flat_yaml_1.yml', b: 'not_flat_yaml_2.yaml', expected: 'Property \'xmas\' was removed' },
    { a: 'not_flat_yaml_1.yml', b: 'not_flat_yaml_2.yaml', expected: 'Property \'xmas-fifth-day.location\' was added with value: \'a pear tree\'' },
    { a: 'not_flat_yaml_1.yml', b: 'not_flat_yaml_2.yaml', expected: 'Property \'xmas-fifth-day.partridges.location\' was removed' },
  ])('.add($a, $b)', ({ a, b, expected }) => {
    const diff = genDiff(getPathToFile(a), getPathToFile(b), 'plain');
    expect(diff).toMatch(expected);
  });
});

describe('test json formatter for JSON and YAML files', () => {
  test.each([
    { a: 'not_flat_json_1.json', b: 'not_flat_json_2.json', expected: '"setting2":{"state":"removed","value":200}' },
    { a: 'not_flat_json_1.json', b: 'not_flat_json_2.json', expected: '"group2":{"state":"removed","value":{"abc":12345,"deep":{"id":45}}}' },
    { a: 'not_flat_json_1.json', b: 'not_flat_json_2.json', expected: '"group3":{"state":"added","value":{"deep":{"id":{"number":45}},"fee":100500}' },
    { a: 'not_flat_yaml_1.yml', b: 'not_flat_yaml_2.yaml', expected: '"xmas":{"state":"removed","value":true}' },
    { a: 'not_flat_yaml_1.yml', b: 'not_flat_yaml_2.yaml', expected: '"calling-birds":{"value":"five","state":"updated","oldValue":"four"}' },

  ])('.add($a, $b)', ({ a, b, expected }) => {
    const diff = genDiff(getPathToFile(a), getPathToFile(b), 'json');
    expect(diff).toMatch(expected);
  });
});

describe('test stylish formatter for JSON and YAML files', () => {
  test.each([
    { a: 'not_flat_json_1.json', b: 'not_flat_json_2.json', expected: '      - setting3: true' },
    { a: 'not_flat_json_1.json', b: 'not_flat_json_2.json', expected: '      + setting3: null' },
    { a: 'not_flat_json_1.json', b: 'not_flat_json_2.json', expected: '              + wow: so much' },
    { a: 'not_flat_json_1.json', b: 'not_flat_json_2.json', expected: '  + group3: {' },
    { a: 'not_flat_yaml_1.yml', b: 'not_flat_yaml_2.yaml', expected: '  + calling-birds: fred' },
    { a: 'not_flat_yaml_1.yml', b: 'not_flat_yaml_2.yaml', expected: '  - calling-birds: huey' },
    { a: 'not_flat_yaml_1.yml', b: 'not_flat_yaml_2.yaml', expected: '    xmas-fifth-day: {' },
    { a: 'not_flat_yaml_1.yml', b: 'not_flat_yaml_2.yaml', expected: '          - location: a pear tree' },

  ])('.add($a, $b)', ({ a, b, expected }) => {
    const diff = genDiff(getPathToFile(a), getPathToFile(b), 'stylish');
    expect(diff).toMatch(expected);
  });
});
