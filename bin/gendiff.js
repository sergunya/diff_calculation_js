#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/gendiff.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const result = genDiff(filepath1, filepath2, options.format);
    console.log(result);
  });

program.parse();
