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
    file1 = path.join(__dirname, '..', '__fixtures__', 'flat_json_1.json');
    file2 = path.join(__dirname, '..', '__fixtures__', 'flat_json_2.json');
    emptyFile = path.join(__dirname, '..', '__fixtures__', 'empty_json.json');
  });

  test('empty jsons', () => {
    expect(compareObjects(emptyFile, emptyFile)).toEqual('{\n}');
  });

  test('check compare updated files', () => {
    const actualResult = compareObjects(file1, file2);
    expect(actualResult).toMatch('- timeout: 50');
    expect(actualResult).toMatch('+ timeout: 20');
    expect(actualResult).toMatch('+ verbose: true');
    expect(actualResult).toMatch('- follow: false');
    expect(actualResult).toMatch('host: hexlet.io');
  });

  test('check compare emty and not empty', () => {
    const actualResult = compareObjects(emptyFile, file2);
    expect(actualResult).toMatch('+ host: hexlet.io');
    expect(actualResult).toMatch('+ timeout: 20');
    expect(actualResult).toMatch('+ verbose: true');
  });


  test('check compare the same file', () => {
    const actualResult = compareObjects(file2, file2);
    expect(actualResult).toMatch('host: hexlet.io');
    expect(actualResult).toMatch('timeout: 20');
  });
});

describe('test diff for YAML files', () => {

  beforeAll(() => {
    file1 = path.join(__dirname, '..', '__fixtures__', 'flat_yaml_1.yml');
    file2 = path.join(__dirname, '..', '__fixtures__', 'flat_yaml_2.yml');
  });

  test('check compare updated files', () => {
    const actualResult = compareObjects(file2, file1);
    expect(actualResult).toMatch('+ pi: 3.14159');
    expect(actualResult).toMatch('- ray: a drop of golden');
    expect(actualResult).toMatch('+ ray: a drop of golden sun');
    expect(actualResult).toMatch('- golden-rings: 5');
  });

  test('check no differents between files', () => {
    const actualResult = compareObjects(file1, file1);
    expect(actualResult).toMatch('    doe: a deer, a female deer');
    expect(actualResult).toMatch('    pi: 3.14159');
    expect(actualResult).toMatch('    ray: a drop of golden sun');
    expect(actualResult).toMatch('    xmas: true');
  });

});

describe('test diff for not flat JSON files', () => {

  beforeAll(() => {
    file1 = path.join(__dirname, '..', '__fixtures__', 'not_flat_json_1.json');
    file2 = path.join(__dirname, '..', '__fixtures__', 'not_flat_json_2.json');
  });

  test('check compare updated files', () => {
    const actualResult = compareObjects(file1, file2);
    expect(actualResult).toMatch('- baz: bas');
    expect(actualResult).toMatch('+ baz: bars');
    expect(actualResult).toMatch('- group2');
    expect(actualResult).toMatch('+ group3');
  });

});

describe('test diff for not flat YAML files', () => {

  beforeAll(() => {
    file1 = path.join(__dirname, '..', '__fixtures__', 'not_flat_yaml_1.yml');
    file2 = path.join(__dirname, '..', '__fixtures__', 'not_flat_yaml_2.yml');
  });

  test('check compare updated files', () => {
    const actualResult = compareObjects(file1, file2);
    expect(actualResult).toMatch('- location: "a pear tree"s');
    expect(actualResult).toMatch('+ location: "a pear tree"');
    expect(actualResult).toMatch('- xmas: true');
    expect(actualResult).toMatch('    pi: 3.14159');
  });

});