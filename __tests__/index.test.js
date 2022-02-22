import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import compareObjects from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let file1;
let file2;
let emptyFile;

beforeAll(() => {
  file1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  file2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  emptyFile = path.join(__dirname, '..', '__fixtures__', 'empty.json');
});

test('empty jsons', () => {
  expect(compareObjects(emptyFile, emptyFile)).toEqual('{\n}');
});

test('check compare updated files', () => {
  const actualResult = compareObjects(file1, file2);
  expect(actualResult).toMatch('  - timeout: 50');
  expect(actualResult).toMatch('  + timeout: 20');
  expect(actualResult).toMatch('  + verbose: true');
  expect(actualResult).toMatch('  - follow: false');
  expect(actualResult).toMatch('    host: hexlet.io');
});

test('check compare emty and not empty', () => {
  const actualResult = compareObjects(emptyFile, file2);
  expect(actualResult).toMatch('  + host: hexlet.io');
  expect(actualResult).toMatch('  + timeout: 20');
  expect(actualResult).toMatch('  + verbose: true');
});

test('check compare not empty and empty', () => {
  const actualResult = compareObjects(file2, emptyFile);
  expect(actualResult).toMatch('  - host: hexlet.io');
  expect(actualResult).toMatch('  - timeout: 20');
  expect(actualResult).toMatch('  - verbose: true');
});

test('check compare the same file', () => {
  const actualResult = compareObjects(file2, file2);
  expect(actualResult).toMatch('    host: hexlet.io');
  expect(actualResult).toMatch('    timeout: 20');
  expect(actualResult).toMatch('    verbose: true');
});
