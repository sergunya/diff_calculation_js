#!/usr/bin/env node
import { Command } from 'commander';
import getDiff from '../src/index.js';
import stylish from '../src/formatter.js';
import parseFile from '../src/parsers.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const file1 = parseFile(filepath1);
    const file2 = parseFile(filepath2);
    const diff = getDiff(file1, file2);
    // console.log(JSON.stringify(diff));
    console.log(stylish(diff, file1, file2));
  });

program.parse();
