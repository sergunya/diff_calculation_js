import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import compareObjects from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let file1;
let file2;
let emptyFile;

describe('test diff for JSON files', () => {

  beforeAll(() => {
    file1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
    file2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');
    emptyFile = path.join(__dirname, '..', '__fixtures__', 'empty.json');
    console.log(1);
  });

  test('empty jsons', () => {
    console.log(file1);
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
});

describe('test diff for YAML files', () => {

  beforeAll(() => {
    file1 = path.join(__dirname, '..', '__fixtures__', 'file_1_yaml.yml');
    file2 = path.join(__dirname, '..', '__fixtures__', 'file_2_yaml.yml');

    console.log(2);
  });

  test('check compare updated files', () => {
    const actualResult = compareObjects(file2, file1);
    expect(actualResult).toMatch('  + pi: 3.14159');
    expect(actualResult).toMatch('  - ray: a drop of golden');
    expect(actualResult).toMatch('  + ray: a drop of golden sun');
    expect(actualResult).toMatch('  - golden-rings: 5');
  });

  test('check no differents between files', () => {
    const actualResult = compareObjects(file1, file1);
    expect(actualResult).toMatch('    doe: a deer, a female deer');
    expect(actualResult).toMatch('    pi: 3.14159');
    expect(actualResult).toMatch('    ray: a drop of golden sun');
    expect(actualResult).toMatch('    xmas: true');
  });

});