import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../index.js';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathToFile = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const resultJson = readFileSync(getPathToFile('resultJson'), 'utf8');
const resultStylish = readFileSync(getPathToFile('resultStylish'), 'utf8');
const resultPlain =  readFileSync(getPathToFile('resultPlain'), 'utf8');

const extensions = ['json', 'yml']


describe('Test stylish formatter', () => {
  test.each(extensions)('Check stylish formatter for %p extenstion', (extension) => {
    const beforeFile = getPathToFile(`before.${extension}`);
    const afterFile = getPathToFile(`after.${extension}`);

    expect(gendiff(beforeFile, afterFile, 'stylish')).toEqual(resultStylish);
  });
});

describe('Test JSON formatter', () => {
  test.each(extensions)('Check JSON formatter for %p extenstion', (extension) => {
    const beforeFile = getPathToFile(`before.${extension}`);
    const afterFile = getPathToFile(`after.${extension}`);

    expect(gendiff(beforeFile, afterFile, 'json')).toEqual(resultJson);
  });
});

describe('Test plain formatter', () => {
  test.each(extensions)('Check plain formatter for %p extenstion', (extension) => {
    const beforeFile = getPathToFile(`before.${extension}`);
    const afterFile = getPathToFile(`after.${extension}`);

    expect(gendiff(beforeFile, afterFile, 'plain')).toEqual(resultPlain);
  });
});

describe('Test default formatter', () => {
  test.each(extensions)('Check default formatter for %p extenstion', (extension) => {
    const beforeFile = getPathToFile(`before.${extension}`);
    const afterFile = getPathToFile(`after.${extension}`);

    expect(gendiff(beforeFile, afterFile)).toEqual(resultStylish);
  });
});