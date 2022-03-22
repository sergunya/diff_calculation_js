import path from 'path';
import { readFileSync } from 'fs';

export const getAbsoluteFilePath = (filepath) => {
  if (filepath.startsWith('.')) {
    const procDir = process.cwd();

    return path.resolve(procDir, filepath);
  }

  return path.resolve(filepath);
};

export const getExtension = (filepath) => path.extname(filepath).slice(1);

export const readFile = (filepath) => readFileSync(filepath, { encoding: 'utf8', flag: 'r' });
