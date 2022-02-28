import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import compareObjects from '../src/index.js';
import stylish from '../src/formatters/stylish.js';

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
      const diff = compareObjects(file1, file2);
      const output = stylish(diff);

      expect(output).toMatch('       - setting3: true');
      expect(output).toMatch('       + setting3: null');
      expect(output).toMatch('               + wow: so much');
      expect(output).toMatch('   + group3: {');
    });
  
});
  
describe('test diff for not flat YAML files', () => {
  
    beforeAll(() => {
      file1 = path.join(__dirname, '..', '__fixtures__', 'not_flat_yaml_1.yml');
      file2 = path.join(__dirname, '..', '__fixtures__', 'not_flat_yaml_2.yml');
    });
  
    test('check compare updated files', () => {
      const diff = compareObjects(file1, file2);
      const output = stylish(diff);
      expect(output).toMatch('   + calling-birds: fred');
      expect(output).toMatch('   - calling-birds: huey');
      expect(output).toMatch('     xmas-fifth-day: {');
      expect(output).toMatch('           - location: a pear tree');
    });
  
});