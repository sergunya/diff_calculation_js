#!/usr/bin/env node
import { Command } from 'commander';
import compareFiles from '../src/index.js';
import stylish from '../src/formatter.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const result = compareFiles(filepath1, filepath2);
    console.log(stylish(result));
  });

program.parse();
