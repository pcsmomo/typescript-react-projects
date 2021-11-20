import { Command } from 'commander';

export const serveCommand = new Command()
  .command('serve [filename]') // [] is optional
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005') // <> is required
  .action((filename = 'notebook.js', options) => {
    // console.log('Getting ready to serve a file');
    console.log(filename, options);
  });
