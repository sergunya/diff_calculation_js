import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let file1;
let file2;


describe('test plain formatter for diff of not flat JSON files', () => {

    beforeAll(() => {
      file1 = path.join(__dirname, '..', '__fixtures__', 'not_flat_json_1.json');
      file2 = path.join(__dirname, '..', '__fixtures__', 'not_flat_json_2.json');
    });
  
    test('check compare updated files', () => {
      const diff = genDiff(file1, file2, 'plain');

      expect(diff).toMatch('Property \'common.follow\' was added with value: false');
      expect(diff).toMatch('Property \'common.setting3\' was updated. From true to null');
      expect(diff).toMatch('Property \'group2\' was removed');
      expect(diff).toMatch('Property \'group3\' was added with value: [complex_value]');
    });
  
});
  
describe('test plain formatter for diff of not flat YAML files', () => {
  
    beforeAll(() => {
      file1 = path.join(__dirname, '..', '__fixtures__', 'not_flat_yaml_1.yml');
      file2 = path.join(__dirname, '..', '__fixtures__', 'not_flat_yaml_2.yml');
    });
  
    test('check compare updated files', () => {
      const diff = genDiff(file1, file2, 'plain');

      expect(diff).toMatch('Property \'calling-birds\' was updated. From huey to fred');
      expect(diff).toMatch('Property \'xmas\' was removed');
      expect(diff).toMatch('Property \'xmas-fifth-day.location\' was added with value: a pear tree');
      expect(diff).toMatch('Property \'xmas-fifth-day.partridges.location\' was removed');
    });
  
});