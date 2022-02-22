#!/usr/bin/env node
import { Command } from 'commander';
import compareObjects from '../src/index.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const result = compareObjects(filepath1, filepath2);
    console.log(result);
  });

program.parse();
