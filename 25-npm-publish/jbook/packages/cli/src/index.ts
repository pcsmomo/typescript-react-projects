#!/usr/bin/env node
import { program } from 'commander';
import { serveCommand } from './comannds/serve';

program.addCommand(serveCommand);

// program
//   .addCommand(serveCommand)
//   .addCommand(loginCommand); // It can be added like this

program.parse(process.argv);
