import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathToFile = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const resultJson = readFileSync(getPathToFile('resultJSON'), 'utf8');
const resultStylish = readFileSync(getPathToFile('resultStylish'), 'utf8');
const resultPlain = readFileSync(getPathToFile('resultPlain'), 'utf8');

const extensions = ['json', 'yml'];

describe('Test formatters', () => {
  test.each(extensions)('Check formatter for %p extenstion', (extension) => {
    const beforeFile = getPathToFile(`before.${extension}`);
    const afterFile = getPathToFile(`after.${extension}`);

    expect(gendiff(beforeFile, afterFile, 'stylish')).toEqual(resultStylish);
    expect(gendiff(beforeFile, afterFile, 'json')).toEqual(resultJson);
    expect(gendiff(beforeFile, afterFile, 'plain')).toEqual(resultPlain);
    expect(gendiff(beforeFile, afterFile)).toEqual(resultStylish);
  });
});
