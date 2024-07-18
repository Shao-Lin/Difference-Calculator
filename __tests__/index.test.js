import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('genDiff JSON', () => {
  test('genDiff with different files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expectedOutput = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
    const result = genDiff(filepath1, filepath2);
    expect(result).toBe(expectedOutput);
  });

  test('genDiff with identical files', () => {
    const filepath1 = getFixturePath('file1.json');
    const expectedOutput = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`;
    const result = genDiff(filepath1, filepath1);
    expect(result).toBe(expectedOutput);
  });

  test('genDiff with one empty file', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('empty.json');
    const expectedOutput = `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`;
    const result = genDiff(filepath1, filepath2);
    expect(result).toBe(expectedOutput);
  });

  test('genDiff with non-existent file', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('nonexistent.json');
    expect(() => {
      genDiff(filepath1, filepath2);
    }).toThrow();
  });
});

describe('genDiff YAML', () => {
  test('genDiff with different files', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');
    const expectedOutput = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
    const result = genDiff(filepath1, filepath2);
    expect(result).toBe(expectedOutput);
  });

  test('genDiff with identical files', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const expectedOutput = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`;
    const result = genDiff(filepath1, filepath1);
    expect(result).toBe(expectedOutput);
  });

  test('genDiff with one empty file', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('empty.yaml');
    const expectedOutput = `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`;
    const result = genDiff(filepath1, filepath2);
    expect(result).toBe(expectedOutput);
  });

  test('genDiff with non-existent file', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('nonexistent.yaml');
    expect(() => {
      genDiff(filepath1, filepath2);
    }).toThrow();
  });
});
