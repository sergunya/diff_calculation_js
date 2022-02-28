import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import compareObjects from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let file1;
let file2;


describe('test generetaed diff object JSON files', () => {

    beforeAll(() => {
      file1 = path.join(__dirname, '..', '__fixtures__', 'not_flat_json_1.json');
      file2 = path.join(__dirname, '..', '__fixtures__', 'not_flat_json_2.json');
    });
  
    test('check compare updated files', () => {
      const diff = compareObjects(file1, file2);

      expect(diff).toHaveProperty('common.follow.state', 'created');
      expect(diff).toHaveProperty('common.setting6.doge.wow.state', 'updated');
      expect(diff).toHaveProperty('group2.state', 'deleted');
      expect(diff).toHaveProperty('group3.state', 'created');
    });
  
});
  