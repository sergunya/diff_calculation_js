import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let file1;
let file2;


describe('test stylish formatter for diff of not flat JSON files', () => {

    beforeAll(() => {
      file1 = path.join(__dirname, '..', '__fixtures__', 'not_flat_json_1.json');
      file2 = path.join(__dirname, '..', '__fixtures__', 'not_flat_json_2.json');
    });
  
    test('check compare updated files', () => {
      const diff = genDiff(file1, file2, 'stylish');

      expect(diff).toMatch('       - setting3: true');
      expect(diff).toMatch('       + setting3: null');
      expect(diff).toMatch('               + wow: so much');
      expect(diff).toMatch('   + group3: {');
    });
  
});
  
describe('test stylish formatter for diff of not flat YAML files', () => {
  
    beforeAll(() => {
      file1 = path.join(__dirname, '..', '__fixtures__', 'not_flat_yaml_1.yml');
      file2 = path.join(__dirname, '..', '__fixtures__', 'not_flat_yaml_2.yml');
    });
  
    test('check compare updated files', () => {
      const diff = genDiff(file1, file2, 'stylish');

      expect(diff).toMatch('   + calling-birds: fred');
      expect(diff).toMatch('   - calling-birds: huey');
      expect(diff).toMatch('     xmas-fifth-day: {');
      expect(diff).toMatch('           - location: a pear tree');
    });
  
});