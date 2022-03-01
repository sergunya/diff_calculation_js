import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let file1;
let file2;


describe('test json formatter for diff of not flat JSON files', () => {

    beforeAll(() => {
      file1 = path.join(__dirname, '..', '__fixtures__', 'not_flat_json_1.json');
      file2 = path.join(__dirname, '..', '__fixtures__', 'not_flat_json_2.json');
    });
  
    test('check compare updated files', () => {
      const diff = genDiff(file1, file2, 'json');

      expect(diff).toMatch('"setting2":{"state":"removed","value":200}');
      expect(diff).toMatch('"group2":{"state":"removed","value":{"abc":12345,"deep":{"id":45}}}');
      expect(diff).toMatch('"group3":{"state":"added","value":{"deep":{"id":{"number":45}},"fee":100500}');
    });
  
});
  
describe('test json formatter for diff of not flat YAML files', () => {
  
    beforeAll(() => {
      file1 = path.join(__dirname, '..', '__fixtures__', 'not_flat_yaml_1.yml');
      file2 = path.join(__dirname, '..', '__fixtures__', 'not_flat_yaml_2.yaml');
    });
  
    test('check compare updated files', () => {
      const diff = genDiff(file1, file2, 'json');

      expect(diff).toMatch('"xmas":{"state":"removed","value":true}');
      expect(diff).toMatch('"calling-birds":{"value":"five","state":"updated","oldValue":"four"}');
      
    });
  
});