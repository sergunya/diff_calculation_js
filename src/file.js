import path from 'path';
import { readFileSync } from 'fs';

const getAbsoluteFilePath = (filepath) => {
  if (filepath.startsWith('.')) {
    const procDir = process.cwd();

    return path.resolve(procDir, filepath);
  }

  return path.resolve(filepath);
};

const proccedFile = (src) => {
  const absolutePath = getAbsoluteFilePath(src);
  const content = readFileSync(absolutePath, { encoding: 'utf8', flag: 'r' });

  return {
    path: absolutePath,
    extenstion: path.extname(absolutePath),
    data: content,
  };
};

export default proccedFile;
