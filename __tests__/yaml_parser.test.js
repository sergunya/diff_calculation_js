import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import compareObjects from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let file1;
let file2;


describe('test genereted diff object YAML files', () => {

    beforeAll(() => {
      file1 = path.join(__dirname, '..', '__fixtures__', 'not_flat_yaml_1.yml');
      file2 = path.join(__dirname, '..', '__fixtures__', 'not_flat_yaml_2.yml');
    });
  
    test('check compare updated files', () => {
      const diff = compareObjects(file1, file2);

      expect(diff).toHaveProperty('calling-birds.state', 'updated');
      expect(diff).toHaveProperty('xmas.state', 'removed');
      expect(diff).toHaveProperty('xmas-fifth-day.location.state', 'added');
    });
  
});
  